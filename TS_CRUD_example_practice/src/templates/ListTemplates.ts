import FullList from "../model/FullList";

interface DomList {
    //unordered List elements
    ul: HTMLUListElement,
    // clear out the list
    clear(): void,
    // for rendering full list
    render(fullList: FullList): void,
}

export default class ListTemplates implements DomList{
    ul: HTMLUListElement // the ul is defined here

    static instance: ListTemplates = new ListTemplates()
    // creating a singleton so its the only one instance

    private constructor(){
        // to get the list items by id
        this.ul= document.getElementById("listItems") as HTMLUListElement
    }

    clear(): void{
        this.ul.innerHTML= '' // clearing the list and setting as empty string
    }

    render(fullList: FullList): void {
        this.clear() // calling clear to clean the list at the biggining of the method

        fullList.list.forEach(item =>{
            // going through each item
            const li= document.createElement("li") as HTMLLIElement
            li.className="item"

            const check = document.createElement("input") as HTMLInputElement

            check.type = "checkbox"
            // here the getters and setters for variable is being used
            check.id = item.id 
            // each check id will be unique
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check) //appending the check box eliment with the parent list

            check.addEventListener('change',() => { 
                // event listener will be used to see if the checked box has been selected or not
                item.checked= !item.checked // this will toggole the check box of a item
                fullList.save() // saving after changes
            })

            // adding label to hold the description of each item
            const label = document.createElement("label") as HTMLLabelElement
            label.htmlFor = item.id // labels for different id
            label.textContent = item.item
            li.append(label)

            // button for deleting item form list
            const button = document.createElement("button") as HTMLButtonElement
            button.className= 'button'
            button.textContent= 'X'
            li.append(button)

            button.addEventListener('click',()=> {
                fullList.removeItem(item.id) 
                // fullList.save()
                this.render(fullList) 
                // as its only respond to an action this is not going to create endless loop
            })

            // now adding to the parent list (unordered List) so li is the parameter here
            this.ul.append(li)
        })
    }
}