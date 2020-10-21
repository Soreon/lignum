/**
 * options: {
 *  checkbox: false,
 *  labelClick: 'toggleCheckbox' | 'toggleWrap' | null
 *  imgClick: 'toggleCheckbox' | 'toggleWrap' | null
 * }
 */

/* eslint-disable no-bitwise */
export default class Lignum {
  container = null;

  data = null;

  options = null;

  constructor(container, options, data) {
    this.container = container;
    this.data = data;
    this.options = options;
    this.generate(this.container, this.data);
  }

  static emitEvent(element, eventName) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, false, true);
    console.log(eventName, element);
    element.dispatchEvent(event);
  }

  checkChildren(node) {
    const childrenContainer = node.querySelector('.lignum-node-children');
    if (childrenContainer) {
      const childrenCheckboxes = childrenContainer.querySelectorAll('input[type=checkbox]');
      const nodeCheckbox = node.querySelector('input[type=checkbox]');
      for (let i = 0; i < childrenCheckboxes.length; i += 1) {
        if (childrenCheckboxes[i].checked !== nodeCheckbox.checked || childrenCheckboxes[i].indeterminate !== false) {
          Lignum.emitEvent(childrenCheckboxes[i], 'change');
        }
        childrenCheckboxes[i].checked = nodeCheckbox.checked;
        childrenCheckboxes[i].indeterminate = false;
        if (childrenCheckboxes[i].indeterminate) {
          Lignum.emitEvent(childrenCheckboxes[i], 'indeterminate');
        } else if (childrenCheckboxes[i].checked) {
          Lignum.emitEvent(childrenCheckboxes[i], 'checked');
        } else {
          Lignum.emitEvent(childrenCheckboxes[i], 'unchecked');
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
      Lignum.emitEvent(parentCheckbox, 'change');
    }
    parentCheckbox.indeterminate = indeterminate;
    parentCheckbox.checked = checked;
    if (indeterminate) {
      Lignum.emitEvent(parentCheckbox, 'indeterminate');
    } else if (checked) {
      Lignum.emitEvent(parentCheckbox, 'checked');
    } else {
      Lignum.emitEvent(parentCheckbox, 'unchecked');
    }
    this.refreshAncestors(parent);
  }

  generate(container, items) {
    if (!Array.isArray(items)) throw new Error('Data is not an array');
    container.innerHTML = '';
    container.classList.add('lignum-container');
    const hasCheckbox = this.options && this.options.checkbox === true;
    const labelClickToggleCheckbox = this.options && this.options.labelClick === 'toggleCheckbox';
    const labelClickToggleWrap = this.options && this.options.labelClick === 'toggleWrap';
    const imgClickToggleCheckbox = this.options && this.options.imgClick === 'toggleCheckbox';
    const imgClickToggleWrap = this.options && this.options.imgClick === 'toggleWrap';

    // + vertical dotted line
    const verticalDottedLine = document.createElement('div');
    verticalDottedLine.classList.add('lignum-node-vertical-dotted-line');
    container.appendChild(verticalDottedLine);

    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const hasChildren = item.children && item.children.length > 0;
      const hasImage = item.img && item.img.length > 0;

      // + horizontal dotted line
      const horizontalDottedLine = document.createElement('div');
      horizontalDottedLine.classList.add('lignum-node-horizontal-dotted-line');

      // + button
      const btn = document.createElement('button');
      btn.classList.add('lignum-node-button');
      btn.innerText = '+';

      // Checkbox
      let chk = null;
      if (hasCheckbox) {
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
      if (!hasCheckbox && !hasChildren) lbl.classList.add('lignum-node-naked-label');
      lbl.innerText = item.name;

      // The node itself
      const bil = document.createElement('div');
      bil.classList.add('lignum-node-ui');
      for (let j = 0; item.data && j < item.data.length; j += 1) {
        const { key, value } = item.data[j];
        bil.dataset[key] = value;
      }
      if (!hasChildren) bil.classList.add('childless');
      bil.appendChild(horizontalDottedLine);
      if (hasChildren) bil.appendChild(btn);
      if (hasCheckbox) bil.appendChild(chk);
      if (hasImage) bil.appendChild(img);
      bil.appendChild(lbl);

      // Container of the children
      const chl = document.createElement('div');
      chl.classList.add('lignum-node-children');
      if (hasChildren) this.generate(chl, item.children);
      const node = document.createElement('div');
      node.classList.add('lignum-node');
      if (item.nodeState !== 'open') node.classList.add('close');
      node.appendChild(bil);
      if (hasChildren) node.appendChild(chl);

      // Event listeners
      btn.addEventListener('click', (e) => {
        btn.innerText = btn.innerText === '+' ? '-' : '+';
        node.classList.toggle('close');
        item.nodeState = node.classList.contains('close') ? 'close' : 'open';
        Lignum.emitEvent(e.target, node.classList.contains('close') ? 'close' : 'open');
        Lignum.emitEvent(e.target, 'change');
      });

      if (hasCheckbox) {
        chk.addEventListener('click', (e) => {
          if (e.target.indeterminate) {
            item.checkboxState = 'indeterminate';
            Lignum.emitEvent(e.target, 'indeterminate');
          } else if (e.target.checked) {
            item.checkboxState = 'checked';
            Lignum.emitEvent(e.target, 'checked');
          } else {
            item.checkboxState = 'unchecked';
            Lignum.emitEvent(e.target, 'unchecked');
          }
          Lignum.emitEvent(e.target, 'change');
          this.checkChildren(e.target.parentElement.parentElement);
        });
      }

      lbl.addEventListener('click', () => {
        if (labelClickToggleCheckbox) {
          chk.click();
        } else if (labelClickToggleWrap) {
          btn.click();
        }
      });

      if (hasImage) {
        img.addEventListener('click', () => {
          if (imgClickToggleCheckbox) {
            chk.click();
          } else if (imgClickToggleWrap) {
            btn.click();
          }
        });
      }

      container.appendChild(node);
    }
  }
}
