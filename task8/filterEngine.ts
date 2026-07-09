export class FilterEngine<T extends object> {
  filterByProperty(items: T[], property: keyof T, value: any): T[] {
    return items.filter((item) => item[property] === value);
  }
}
