let deliveryDate = document.getElementById('arrivalDate');
let timePeriod = document.getElementById('timePeriodDropDown');

updateDeliveryDate();

deliveryDate.addEventListener('change', () => {
  updateDeliveryDate();
});

function updateDeliveryDate() {
  var today = new Date();
  var day = today.getDate();
  var mon = today.getMonth() + 1; //January is 0!

  let dd = String(day).padStart(2, '0');
  let mm = String(mon).padStart(2, '0');
  let yyyy = today.getFullYear();

  if (timePeriod != 99) {
    yyyy = today.getFullYear() + parseInt(timePeriod.value);
    deliveryDate.value = yyyy + '-' + mm + '-' + dd;
  }
  console.log('hell');
}
