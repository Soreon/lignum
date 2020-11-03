/**
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

  constructor(container, options, data) {
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

  checkChildren(item) {
    if (item.children) {
      for (let i = 0; i < item.children.length; i += 1) {
        item.children[i].checkboxState = item.checkboxState;
        item.children[i].indeterminate = false;
        if (item.children[i].checkbox) item.children[i].checkbox.checked = item.checkboxState === 'checked';
      }
      for (let i = 0; i < item.children.length; i += 1) {
        this.checkChildren(item.children[i]);
      }
    }
    this.refreshAncestors(item);
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
    const stateChanged = indeterminate !== parent.checkbox.indeterminate || checked !== parent.checkbox.checked;

    if (stateChanged) this.emitEvent('stateChanged', parent.checkbox);

    parent.checkbox.indeterminate = indeterminate;
    parent.checkbox.checked = checked;

    if (indeterminate) {
      parent.checkboxState = 'indeterminate';
      if (stateChanged) this.emitEvent('checkboxIndeterminate', parent.checkbox);
    } else if (checked) {
      parent.checkboxState = 'checked';
      if (stateChanged) this.emitEvent('checkboxChecked', parent.checkbox);
    } else {
      parent.checkboxState = 'unchecked';
      if (stateChanged) this.emitEvent('checkboxUnchecked', parent.checkbox);
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

  addItemsParents(node) {
    for (let i = 0; node.children && i < node.children.length; i += 1) {
      node.children[i].parent = node;
      this.addItemsParents(node.children[i]);
    }
  }

  addDataParents(data) {
    for (let i = 0; i < data.length; i += 1) {
      this.addItemsParents(data[i]);
    }
  }

  getFlattenedData(data = this.data) {
    let flattenedData = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = { ...data[i] };
      delete item.children;
      flattenedData.push(item);
      if (data[i].children && data[i].children.length > 0) flattenedData = [...flattenedData, ...this.getFlattenedData(data[i].children)];
    }
    return flattenedData;
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
    const hasChildren = item.children && item.children.length > 0;
    const hasImage = item.img && item.img.length > 0;

    if (item.hidden === true) return;

    // + horizontal dotted line
    const horizontalDottedLine = document.createElement('div');
    horizontalDottedLine.classList.add('lignum-node-horizontal-dotted-line');

    // + button
    const btn = document.createElement('button');
    btn.classList.add('lignum-node-button');
    btn.innerText = item.open ? '-' : '+';

    // Checkbox
    let chk = null;
    if (this.hasCheckbox) {
      chk = document.createElement('input');
      chk.type = 'checkbox';
      chk.classList.add('lignum-node-checkbox');
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
      img = document.createElement('img');
      img.classList.add('lignum-node-img');
      img.src = item.img;
    }

    // Label
    const lbl = document.createElement('span');
    lbl.classList.add('lignum-node-label');
    if (!this.hasCheckbox && !hasChildren) lbl.classList.add('lignum-node-naked-label');
    lbl.innerText = item.name;

    // The node itself
    const bil = document.createElement('div');
    bil.classList.add('lignum-node-ui');
    item.node = bil;
    if (item.id) bil.id = item.id;

    if (item.data) {
      const keys = Object.keys(item.data);
      for (let j = 0; j < keys.length; j += 1) {
        const key = keys[j];
        bil.dataset[keys[j]] = item.data[key];
      }
    }
    if (!hasChildren) bil.classList.add('childless');
    bil.appendChild(horizontalDottedLine);
    if (hasChildren) bil.appendChild(btn);
    if (this.hasCheckbox) bil.appendChild(chk);
    if (hasImage) bil.appendChild(img);
    bil.appendChild(lbl);

    // Container of the children
    const chl = document.createElement('div');
    chl.classList.add('lignum-node-children');
    if (hasChildren) this.generate(chl, item.children);
    const node = document.createElement('div');
    node.classList.add('lignum-node');
    if (!item.open) node.classList.add('close');
    node.appendChild(bil);
    if (hasChildren) node.appendChild(chl);

    // Set default ndoes states  
    item.open = !!item.open;
    item.checkboxState = item.checkboxState || 'checked';

    // Event listeners
    btn.addEventListener('click', (e) => {
      node.classList.toggle('close');
      const isClosed = node.classList.contains('close');
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

    container.appendChild(node);
  }

  generate(container, data) {
    if (!Array.isArray(data)) throw new Error('Data is not an array');

    container.innerHTML = '';
    if(!container.classList.contains('lignum-container')) container.classList.add('lignum-container');

    // + vertical dotted line
    const verticalDottedLine = document.createElement('div');
    verticalDottedLine.classList.add('lignum-node-vertical-dotted-line');
    container.appendChild(verticalDottedLine);

    for (let i = 0; i < data.length; i += 1) {
      this.generateItem(container, data[i]);
    }
  }
}
