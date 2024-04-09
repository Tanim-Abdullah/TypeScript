import ListItem from "./ListItem";
// creating a interface for loading and crud oparation
// init: value is being set to void/null.
interface List {
    list: ListItem[],
    load():void,
    save():void,
    clearList():void,
    addItem(item_obj:ListItem):void,
    removeItem(id: string): void,
}

// defining class
export default class FullList implements List{

    static instance: FullList = new FullList()

    // const: for a private List
    // Const: is Private, So that there is only one instance
    // creating a singleton
    private constructor(private _list: ListItem[]= []){}

    get list():ListItem[] {
        return this._list
    }

    // loading the table to show
    load(): void {
        // Retriving Data from localstorage while loading.
        const storedlist: string | null = localStorage.getItem("myList")
        if (typeof storedlist !== "string"){
            return
        }

        // creating a new Item from Parse list
        const parsedList :{_id: string, _item: string, _checked: boolean}[] = JSON.parse(storedlist)

        // creating a new list for each item which has been stringfy 
        parsedList.forEach(item_obj => {
            const newListItem = new ListItem(item_obj._id, item_obj._item, item_obj._checked)
            FullList.instance.addItem(newListItem)
        })

    }

    // Saving the list
    // A local storage is being used
    save():void{
        localStorage.setItem("mylist",JSON.stringify(this._list))
    }
    
    //This is going to be used for clearing the whole list at once if needed
    clearList(): void {
        this._list=[]
        this.save() // so that when the local storage is cleared its going to be saved as an empty array.
    }

    // this function is adding a new Item to the list and saving it for further use
    addItem(item_obj: ListItem): void {
        this._list.push(item_obj)
        this.save()
    }

    // this function is removing a Item from the list
    removeItem(id: string): void {
        this._list = this._list.filter(item => item.id !== id)
        // using filter to filter the list and keep everything else with out the specific id is selected for removing
        // then saving the list for further use
        this.save()
    }
}