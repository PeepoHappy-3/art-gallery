export type IOptions = {
  name: string,
  value: string
}

export type UploadData = {
  characterName: string,
  commType: string,
  charactersCount: number,
  versionsCount: number,
  background: boolean,
  files?: File[],
  backgroundInfo?: string,
  characterInfo?:string,
  extraInfo?: string,
}

export type SliderOptions = {
  slidesPerViewDef : number,
  slidesPerView700: number,
  slideWidth: number,
  nextArrow: string,
  prevArrow: string
}
export type signupData = {
  login: string,
  email:string,
  password: string
}