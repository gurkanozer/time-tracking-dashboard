const menuItems = document.querySelectorAll('.menu-item');
const cards = document.querySelector('.cards');
const data = [];
const getData = async () => {
  await fetch('/data.json')
  .then(res =>res.json())
  .then(
    res =>{
      res.forEach(r => data.push(r))
    }
  )
  setHtml('daily');
}
const setHtml = (selectedItem)=>{
  cards.innerHTML = '';
  data.forEach(obj =>{
    const card = document.createElement('div');
    card.classList.add(`card`);
    card.classList.add(`card-${obj['title'].toLowerCase().replace(' ','-')}`);
    cards.appendChild(card);
    let last ='';
    if(selectedItem === 'daily') last = 'Day';
    else if(selectedItem ==='weekly') last = 'Week';
    else if(selectedItem === 'monthly') last = 'Month'
    card.innerHTML =`
      <div class="card__body">
      <div class="card__header">
        <span class="title">${obj['title']}</span>
        <button class="btn card__btn"><img src="./images/icon-ellipsis.svg" alt=""></button>
      </div>
      <div class="card__content">
        <h4>${obj['timeframes'][selectedItem]['current']}hrs</h4>
        <span>${last == 'Day' ? 'Yesterday' : 'Last '+ last} - ${obj['timeframes'][selectedItem]['previous']}hrs</span>
      </div>
    </div>
    `;
  });
}
//Event Listener
menuItems.forEach(item => {
   item.addEventListener('click',()=>{
    menuItems.forEach(i =>{ i.classList.remove('active')});
    item.classList.add('active');
    let selectedItem = item.innerHTML.toLowerCase();
    setHtml(selectedItem);  
  });  
});
getData();  