export interface IPokeApiResponse {
  name: string;
  [index: string]: string | object | boolean | number;
}
export enum status {
  visible = 'visible',
  hidden = 'hidden',
  online = 'online',
  offline = 'offline',
}
