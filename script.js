window.addEventListener('load', start);

var globalNames = ['Sérgio', 'Pedro', 'Cláudio'];
var inputName = null;
var currentIndex = null;
var isEdit = false;

function start() {
  inputName = document.querySelector('#inputName');

  preventDefault();
  activateInput();
  render();
}

function preventDefault() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(name) {
    globalNames.push(name);
    inputName.value = '';
  }

  function updateName(name) {
    globalNames[currentIndex] = name;
  }

  function handleTyping(event) {
    if (event.key === 'Enter') {
      if (isEdit) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }

      render();
      isEdit = false;
    }
  }

  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      // globalNames.splice(index, 1);

      globalNames = globalNames.filter((_, i) => i !== index);

      render();
    }

    var button = document.createElement('button');
    button.textContent = 'Apagar';
    button.classList.add('btn');

    button.addEventListener('click', deleteName);

    return button;
  }

  function createSpan(index) {
    function editItem() {
      inputName.value = globalNames[index];
      inputName.focus();
      isEdit = true;
      currentIndex = index;
    }

    var span = document.createElement('span');
    span.textContent = globalNames[index];
    span.classList.add('clicable');
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  var ul = document.createElement('ul');

  for (var i = 0; i < globalNames.length; i++) {
    var li = document.createElement('li');
    var button = createDeleteButton(i);
    var span = createSpan(i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
}
