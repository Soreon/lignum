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
      this.generate(this.container, this.data);
    }
  }

  emitEvent(element, eventName, target) {
    const event = new CustomEvent(eventName, { detail: { target } });
    event.initEvent(eventName, false, true);
    element.dispatchEvent(event);
  }

  checkChildren(node) {
    const childrenContainer = node.querySelector('.lignum-node-children');
    if (childrenContainer) {
      const childrenCheckboxes = childrenContainer.querySelectorAll('input[type=checkbox]');
      const nodeCheckbox = node.querySelector('input[type=checkbox]');
      for (let i = 0; i < childrenCheckboxes.length; i += 1) {
        if (childrenCheckboxes[i].checked !== nodeCheckbox.checked || childrenCheckboxes[i].indeterminate !== false) {
          this.emitEvent(childrenCheckboxes[i], 'stateChanged');
        }
        childrenCheckboxes[i].checked = nodeCheckbox.checked;
        childrenCheckboxes[i].indeterminate = false;
        if (childrenCheckboxes[i].indeterminate) {
          this.emitEvent(childrenCheckboxes[i], 'indeterminate');
        } else if (childrenCheckboxes[i].checked) {
          this.emitEvent(childrenCheckboxes[i], 'checked');
        } else {
          this.emitEvent(childrenCheckboxes[i], 'unchecked');
        }
      }
    }
    this.refreshAncestors(node);
  }

  refreshAncestors(node) {
    const parent = node.parentNode.parentNode;
    if (!parent.classList.contains('lignum-node')) return;
    const parentCheckbox = parent.querySelector('input[type=checkbox]');
    const childrenContainer = parent.querySelector('.lignum-node-children');
    const children = childrenContainer.querySelectorAll(':scope .lignum-node');
    let allChecked = true;
    let atLeastOneChecked = false;
    let atLeastOneIndeterminate = false;

    for (let i = 0; i < children.length; i += 1) {
      const childCheckbox = children[i].querySelector('input[type=checkbox]');
      allChecked &= childCheckbox.checked;
      atLeastOneChecked |= childCheckbox.checked;
      atLeastOneIndeterminate |= childCheckbox.indeterminate;
    }
    const indeterminate = atLeastOneIndeterminate || (!allChecked && atLeastOneChecked);
    const checked = allChecked;
    if (indeterminate !== parentCheckbox.indeterminate || checked !== parentCheckbox.checked) {
      this.emitEvent(parentCheckbox, 'stateChanged');
    }
    parentCheckbox.indeterminate = indeterminate;
    parentCheckbox.checked = checked;
    if (indeterminate) {
      this.emitEvent(parentCheckbox, 'indeterminate');
    } else if (checked) {
      this.emitEvent(parentCheckbox, 'checked');
    } else {
      this.emitEvent(parentCheckbox, 'unchecked');
    }
    this.refreshAncestors(parent);
  }

  updateContainer(container) {
    if (typeof container !== 'string') throw new Error('Wrong format for the container\'s id');
    this.container = document.querySelector(container);
    if (!this.container) throw new Error(`Cannot find the container ${container}`);
    this.emitEvent(this.container, 'containerUpdated');
  }

  load(data) {
    this.data = data;
    this.emitEvent(this.container, 'dataLoaded');
  }

  refresh() {
    if (!this.container) throw new Error('The container is not set');
    this.generate(this.container, this.data);
    this.emitEvent(this.container, 'treeRefreshed');
  }

  generate(container, data) {
    if (!Array.isArray(data)) throw new Error('Data is not an array');

    container.innerHTML = '';
    container.classList.add('lignum-container');

    // + vertical dotted line
    const verticalDottedLine = document.createElement('div');
    verticalDottedLine.classList.add('lignum-node-vertical-dotted-line');
    container.appendChild(verticalDottedLine);

    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      const hasChildren = item.children && item.children.length > 0;
      const hasImage = item.img && item.img.length > 0;

      if(item.hidden === true) continue;

      // + horizontal dotted line
      const horizontalDottedLine = document.createElement('div');
      horizontalDottedLine.classList.add('lignum-node-horizontal-dotted-line');

      // + button
      const btn = document.createElement('button');
      btn.classList.add('lignum-node-button');
      btn.innerText = item.open ? '-':  '+';

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
        btn.innerText = btn.innerText === '+' ? '-' : '+';
        node.classList.toggle('close');
        item.open = node.classList.contains('close');
        this.emitEvent(e.target, node.classList.contains('close') ? 'close' : 'open');
        this.emitEvent(this.container, 'stateChanged', e.target);
      });

      if (this.hasCheckbox) {
        chk.addEventListener('input', (e) => {
          if (e.target.indeterminate) {
            item.checkboxState = 'indeterminate';
            this.emitEvent(e.target, 'indeterminate');
          } else if (e.target.checked) {
            item.checkboxState = 'checked';
            this.emitEvent(e.target, 'checked');
          } else {
            item.checkboxState = 'unchecked';
            this.emitEvent(e.target, 'unchecked');
          }
          this.emitEvent(this.container, 'stateChanged', e.target);
          this.checkChildren(e.target.parentElement.parentElement);
        });
      }

      lbl.addEventListener('click', () => {
        if (this.onLabelClick === 'toggleCheckbox') {
          chk.click();
        } else if (this.onLabelClick === 'toggleWrap') {
          btn.click();
        }
        this.emitEvent(this.container, 'nodeClicked');
      });

      lbl.addEventListener('dblclick', () => { this.emitEvent(this.container, 'nodeDblClicked'); });

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
  }
}
