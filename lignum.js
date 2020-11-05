/**
 * data: {
 *  id: string,
 *  name: string,
 *  img: URL,
 *  open: true|false,
 *  checkboxState: 'checked' | 'unchecked'| 'indeterminate',
 *  data: {
 *    test1: 'dazudhaz',
 *    test2: 321654
 *  },
 *  children: []
 *}
 * 
 * options: {
 *  checkbox: false,
 *  labelClick: 'toggleCheckbox' | 'toggleWrap' | null
 *  imgClick: 'toggleCheckbox' | 'toggleWrap' | null
 * }
 */

export default class Lignum {
  container = null;
  data = null;
  options = null;
  _horizontalDottedLine = null;
  _nodeButton = null;
  _nodeCheckbox = null;
  _nodeChildrenContainer = null;
  _nodeContainer = null;
  _nodeElementsContainer = null;
  _nodeImage = null;
  _nodeLabel = null;
  _verticalDottedLine = null;

  get hasCheckbox() {
    return this.options && this.options.checkbox === true;
  }

  get onLabelClick() {
    if (this.options && this.option) {
      return this.options.labelClick;
    }
    return null;
  }

  get onImgClick() {
    if (this.options && this.option) {
      return this.options.imgClick;
    }
    return null;
  }

  createElement(tagName, className, type) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    if (type) element.type = type;
    return element;
  }

  // Create the base elements to be cloned when a tree is generated
  createBaseElements() {
    this._horizontalDottedLine = this.createElement('div', 'lignum-node-horizontal-dotted-line');
    this._nodeButton = this.createElement('button', 'lignum-node-button');
    this._nodeCheckbox = this.createElement('input', 'lignum-node-checkbox', 'checkbox');
    this._nodeChildrenContainer = this.createElement('div', 'lignum-node-children');
    this._nodeContainer = this.createElement('div', 'lignum-node');
    this._nodeElementsContainer = this.createElement('div', 'lignum-node-ui');
    this._nodeImage = this.createElement('img', 'lignum-node-img');
    this._nodeLabel = this.createElement('span', 'lignum-node-label');
    this._verticalDottedLine = this.createElement('div', 'lignum-node-vertical-dotted-line');
  }

  constructor(container, options, data) {
    this.createBaseElements();
    this.updateContainer(container);
    if (options) this.options = options;
    if (data) {
      this.data = data;
      this.addDataParents(this.data);
      this.generate(this.container, this.data);
    }
  }

  emitEvent(eventName, target) {
    const event = new CustomEvent(eventName, { detail: { target } });
    event.initEvent(eventName, false, true);
    this.container.dispatchEvent(event);
  }

  on(type, listener, ...args) {
    this.container.addEventListener(type, listener, ...args);
  }

  checkItem(item, value, indeterminate = false, refreshChild = false, refreshAncestors = false) {
    item.checkboxState = value ? 'checked' : 'unchecked';
    if (indeterminate) item.checkboxState = 'indeterminate';
    item.checkbox.checked = value;
    item.checkbox.indeterminate = indeterminate;
    if (refreshChild) this.checkChildren(item);
    if (refreshAncestors) this.refreshAncestors(item);
    this.emitEvent('stateChanged', e.target);
  }

  checkChildren(item) {
    if (item.children) {
      for (let i = 0; i < item.children.length; i += 1) {
        if (!item.children[i].checkbox) continue;
        if (item.children[i].checkboxState !== item.checkboxState) {
          this.emitEvent(item.checkboxState === 'checked' ? 'checkboxChecked' : 'checkboxUnchecked', item.children[i].checkbox);
        }
        this.checkItem(item.children[i], item.checkboxState === 'checked');
      }
      for (let i = 0; i < item.children.length; i += 1) {
        if (!item.children[i].checkbox) continue;
        this.checkChildren(item.children[i]);
      }
    }
  }

  refreshAncestors(item) {
    const parent = item.parent;
    if (!parent) return false;
    const siblings = parent.children;

    let allChecked = true;
    let atLeastOneChecked = false;
    let atLeastOneIndeterminate = false;

    for (let i = 0; i < siblings.length; i += 1) {
      const childCheckbox = siblings[i].checkbox;
      if (siblings[i].hidden) continue;
      allChecked &= childCheckbox.checked;
      atLeastOneChecked |= childCheckbox.checked;
      atLeastOneIndeterminate |= childCheckbox.indeterminate;
    }

    const indeterminate = atLeastOneIndeterminate || (!allChecked && atLeastOneChecked);
    const checked = allChecked;
    const stateHasChanged = indeterminate !== parent.checkbox.indeterminate || checked !== parent.checkbox.checked;

    this.checkItem(parent, checked, indeterminate);
    if (stateHasChanged) {
      if (indeterminate) {
        this.emitEvent('checkboxIndeterminate', parent.checkbox);
      } else if (checked) {
        this.emitEvent('checkboxChecked', parent.checkbox);
      } else {
        this.emitEvent('checkboxUnchecked', parent.checkbox);
      }
    }
    this.refreshAncestors(parent);
  }

  findItem(id, data = this.data) {
    for (let i = 0; i < data.length; i += 1) {
      if(data[i].id === id) return data[i];
      let childFound = null;
      if(data[i].children) childFound = this.findItem(id, data[i].children);
      if(childFound) return childFound;
    }
    return null;
  }

  updateContainer(container) {
    if (typeof container !== 'string') throw new Error('Wrong format for the container\'s id');
    this.container = document.querySelector(container);
    if (!this.container) throw new Error(`Cannot find the container ${container}`);
    this.emitEvent('containerUpdated', this.container);
  }

  addItemsParent(item) {
    for (let i = 0; item.children && i < item.children.length; i += 1) {
      item.children[i].parent = item;
      this.addItemsParent(item.children[i]);
    }
  }

  addDataParents(data) {
    for (let i = 0; i < data.length; i += 1) {
      this.addItemsParent(data[i]);
    }
  }

  getFlattenedData(data = this.data) {
    let flattenedData = [];
    for (let i = 0; i < data.length; i += 1) {
      flattenedData.push(data[i]);
      if (data[i].children && data[i].children.length > 0) flattenedData = [...flattenedData, ...this.getFlattenedData(data[i].children)];
    }
    return flattenedData;
  }

  getLeaves(data = this.data) {
    let leaves = [];
    for (let i = 0; i < data.length; i += 1) {
      if (!data[i].children || data[i].children.length === 0) {
        leaves.push(data[i]);
      } else {
        leaves = [...leaves, ...this.getLeaves(data[i].children)];
      }
    }
    return leaves;
  }

  load(data) {
    this.data = data;
    this.addDataParents(this.data);
    this.emitEvent('dataLoaded', this.container);
  }

  refresh() {
    if (!this.container) throw new Error('The container is not set');
    if (!Array.isArray(this.data)) return false;
    this.generate(this.container, this.data);
    this.emitEvent('treeRefreshed', this.container);
    return true;
  }

  generateItem(container, item) {
    const numberOfChildren = item.children ? item.children.length : 0;
    const numberOfHiddenChildren = item.children ? item.children.filter(e => e.hidden).length : 0;
    const allChildrenHidden = numberOfHiddenChildren === numberOfChildren
    const hasChildren = numberOfChildren > 0;
    const hasImage = item.img && item.img.length > 0;

    if (item.hidden === true) return;

    // + horizontal dotted line
    const horizontalDottedLine = this._horizontalDottedLine.cloneNode()

    // + button
    const btn = this._nodeButton.cloneNode();
    btn.innerText = item.open && !allChildrenHidden ? '-' : '+';
    if (allChildrenHidden) btn.disabled = true;

    // Checkbox
    let chk = null;
    if (this.hasCheckbox) {
      chk = this._nodeCheckbox.cloneNode();
      switch (item.checkboxState) {
        case 'unchecked':
          chk.checked = false;
          break;
        case 'indeterminate':
          chk.indeterminate = true;
          break;
        case 'checked':
        default:
          chk.checked = true;
          break;
      }
      item.checkbox = chk;
    }

    // image
    let img = null;
    if (hasImage) {
      img = this._nodeImage.cloneNode();
      img.src = item.img;
    }

    // Label
    const lbl = this._nodeLabel.cloneNode();
    if (!this.hasCheckbox && !hasChildren) lbl.classList.add('lignum-node-naked-label');
    lbl.innerHTML = item.name;

    // The node itself
    const bcil = this._nodeElementsContainer.cloneNode();
    item.node = bcil;
    if (item.id) bcil.id = item.id;

    if (item.data) {
      const keys = Object.keys(item.data);
      for (let j = 0; j < keys.length; j += 1) {
        const key = keys[j];
        bcil.dataset[keys[j]] = item.data[key];
      }
    }
    if (!hasChildren) bcil.classList.add('childless');
    bcil.appendChild(horizontalDottedLine);
    if (hasChildren) bcil.appendChild(btn);
    if (this.hasCheckbox) bcil.appendChild(chk);
    if (hasImage) bcil.appendChild(img);
    bcil.appendChild(lbl);

    // Container of the children
    const chl = this._nodeChildrenContainer.cloneNode();
    if (hasChildren) this.generate(chl, item.children);

    // Container of node & children container
    const bilChlCont = this._nodeContainer.cloneNode();
    if (!item.open || allChildrenHidden) bilChlCont.classList.add('close');
    bilChlCont.appendChild(bcil);
    if (hasChildren) bilChlCont.appendChild(chl);

    // Set default ndoes states  
    item.open = !!item.open;
    item.checkboxState = item.checkboxState || 'checked';

    // Event listeners
    btn.addEventListener('click', (e) => {
      bilChlCont.classList.toggle('close');
      const isClosed = bilChlCont.classList.contains('close');
      btn.innerText = isClosed ? '+' : '-';
      item.open = !isClosed;
      this.emitEvent(isClosed ? 'nodeClosed' : 'nodeOpen', e.target);
      this.emitEvent('stateChanged', e.target);
    });

    if (this.hasCheckbox) {
      chk.addEventListener('input', (e) => {
        if (e.target.indeterminate) {
          item.checkboxState = 'indeterminate';
          this.emitEvent('checkboxIndeterminate', e.target);
        } else if (e.target.checked) {
          item.checkboxState = 'checked';
          this.emitEvent('checkboxChecked', e.target);
        } else {
          item.checkboxState = 'unchecked';
          this.emitEvent('checkboxUnchecked', e.target);
        }
        this.checkChildren(item);
        this.refreshAncestors(item);
        this.emitEvent('stateChanged', e.target);
      });
    }

    lbl.addEventListener('click', () => {
      if (this.onLabelClick === 'toggleCheckbox') {
        chk.click();
      } else if (this.onLabelClick === 'toggleWrap') {
        btn.click();
      }
      this.emitEvent('nodeClicked', lbl);
    });

    lbl.addEventListener('dblclick', () => { this.emitEvent('nodeDblClicked', lbl); });

    if (hasImage) {
      img.addEventListener('click', () => {
        if (this.onImgClick === 'toggleCheckbox') {
          chk.click();
        } else if (this.onImgClick === 'toggleWrap') {
          btn.click();
        }
      });
    }

    container.appendChild(bilChlCont);
  }

  generate(container, data) {
    if (!Array.isArray(data)) throw new Error('Data is not an array');

    container.innerHTML = '';
    if(!container.classList.contains('lignum-container')) container.classList.add('lignum-container');

    // + vertical dotted line
    const verticalDottedLine = this._verticalDottedLine.cloneNode();
    container.appendChild(verticalDottedLine);

    for (let i = 0; i < data.length; i += 1) {
      this.generateItem(container, data[i]);
    }
  }
}
