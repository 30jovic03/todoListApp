var itemList = {
  items: [],
  addItem: function() {
    var newInput = document.getElementById('newInput');
    if (newInput.value) {
      this.items.push({
        itemText: newInput.value,
        completed: false
      });
      newInput.value= '';
      view.displayItems();
      view.displayFilter();
    }
  },
  changeItem: function(position, newText) {
    this.items[position].itemText = newText;
    view.displayItems();
  },
  deleteItem: function(position) {
    this.items.splice(position, 1);
    view.displayItems();
    view.displayFilter();
  },
  toggleItem: function(position) {
    var item = this.items[position];
    item.completed = !item.completed;
    view.displayItems();
    view.displayFilter();
  },
  toggleAll: function () {
    var totalItems = this.items.length;
    var completedItems = 0;

    this.items.forEach(element => {
      if (element.completed === true) {
        completedItems++;
      }
    });
    
    this.items.forEach(element => {
      if (completedItems === totalItems) {
        element.completed = false;
      } else {
        element.completed = true;
      }
    });
    view.displayItems();
    view.displayFilter();
  }
};

var view = {
  displayItems: function() {
    var itemsUl = document.getElementById('viewList');
    itemsUl.innerHTML = '';
    for (var i = 0; i < itemList.items.length; i++) {
      var itemLi = document.createElement('li');
      var item = itemList.items[i];
      var change = false;

      if (item.completed === true) {
        change = true;
        itemLi.className = 'checked';
      }

      itemLi.id = i;
      itemLi.appendChild(this.createCheckBox(change));
      itemLi.appendChild(this.createListText(item.itemText));
      itemLi.appendChild(this.createEditButton());
      itemLi.appendChild(this.createDeleteButton());
      itemsUl.appendChild(itemLi);
    }
  },
  createCheckBox: (change) => {
    var checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = change;
    checkBox.className = 'checkBox';
    return checkBox;
  },
  createListText: (text) => {
    var listText = document.createElement('input');
    listText.setAttribute('type', 'text');
    listText.setAttribute('value', text);
    listText.disabled = true;
    listText.className = 'listText';
    return listText;
  },
  createEditButton: () => {
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    return editButton;
  },
  createDeleteButton: () => {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },

  eventListeners: () => {
    var itemsUl = document.getElementById('viewList');

    newInput.addEventListener('keydown', event => {
      if (event.keyCode === 13) {
        itemList.addItem();
      }
    });

    itemsUl.addEventListener('click', event => {
      // Get the element that was clicked on.
      var elementClicked = event.target;

      // Check if elementClicked is a checkbox.
      if (elementClicked.className === 'checkBox') {
        itemList.toggleItem(parseInt(elementClicked.parentNode.id));
      }
      // Check if elementClicked is a edit button.
      if (elementClicked.innerHTML === 'Edit') {
        elementClicked.parentNode.querySelector('input[type=text]').removeAttribute('disabled');
        elementClicked.parentNode.querySelector('input[type=text]').setAttribute('style', 'text-decoration: none;');
        elementClicked.parentNode.querySelector('input[type=text]').focus();
        elementClicked.innerHTML = 'Done';
        } else if (elementClicked.innerHTML === 'Done') {
        var position = (elementClicked.parentNode.id);
        var newText = elementClicked.parentNode.querySelector('input[type=text]').value;
        itemList.changeItem(position, newText);
      }
      // Check if elementClicked is a delete button.
      if (elementClicked.className === 'deleteButton') {
        itemList.deleteItem(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  view.eventListeners();
});