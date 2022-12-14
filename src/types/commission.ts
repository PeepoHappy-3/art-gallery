export type Commission = {
  _id:string,
  characterName:string,
  commType: string,
  charactersCount: string,
  versionsCount: string,
  information: string,
  fullPrice:string,
  date: Date,
  status: string,
  attachments: Array<string>
}