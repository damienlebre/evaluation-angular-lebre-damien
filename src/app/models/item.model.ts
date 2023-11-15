export interface ItemHttp{
  "id": number,
  "name": string,
  "description": string,
  "rarity": number,
  "carryLimit": number,
  "value": number
}

export interface Item{
  id: number,
  name : string,
  description: string,
  rarity: number,
  carryLimit: number,
  value: number
}

export namespace Item{
  export function mapperItemHttpToItem(itemHttp: ItemHttp) : Item{
    return {
      id: itemHttp.id,
      name: itemHttp.name,
      description: itemHttp.description,
      rarity : itemHttp.rarity,
      carryLimit: itemHttp.carryLimit,
      value: itemHttp.value
    }
  }
}
