import { BASE_URL } from "./utils";
export const pump = (reader:ReadableStreamDefaultReader<any>, controller:ReadableStreamController<any>) : any =>{
  return reader!.read().then(({ done, value }) => {
    // When no more data needs to be consumed, close the stream
    if (done) {
      controller.close();
      return;
    }
    // Enqueue the next data chunk into our target stream
    controller.enqueue(value);
    return pump(reader, controller);
  });
}

export const fetchAvatar = async ()=>{
  return fetch(`${BASE_URL}users/front`).then(res=>{
    if(res.ok){
      const reader = res.body?.getReader();
      return new ReadableStream({
        start(controller) {          
          return pump(reader!, controller);     
        }
      })
    }      
  })
  .then(stream => new Response(stream))
  // Create an object URL for the response
  .then(response => response.blob())
  .then(blob => URL.createObjectURL(blob))
  // Update image
  .then(url => {     
    return url})
} 