declare interface IItem {
  id: string;
  title: string;
  tags?: string[];
}
declare interface IContainer {
  id: string;
  type: string;
  accept: string[];
  items: IITem[];
}
