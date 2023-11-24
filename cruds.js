let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");

let mood = "Creat";
let index; //global

//console.log(price,taxes,ads,discount,total);

function countTotal() {
  // console.log("done");

  if (price.value != "") {
    //to convert value from string to numb use +
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = "TOTAL";
    total.style.backgroundColor = "rgb(250, 94, 83)";
  }
}

//CREAT PRODUCT
//احسن مكان احفظ فيه الداتا هو الارااي

//هعمل كونديشن عشان البيانات ف اللوكال ستورج متتحذفش لما اجي اضيف برودكت جديد بعد ال reload

// let datapro =[];
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

//   document.getElementById('submit').addEventListener( onclick, function(){

//     console.log('done');
//     //محتاج اجمع بيانات المنتج الواحد في اوبجيكت عشان كل البيانات متتلخبطش
//      let newpro = {
//         title: title.value,
//         price: price.value,
//         taxes: taxes.value,
//         ads: ads.value,
//         discount: discount.value,
//         total:total.innerHTML,//ده مش اينبوت لا انا محتاج القيمه اللي جواها
//         count: count.value,
//         category: category.value,

//     }
//  })

submit.onclick = function () {
  // console.log('done');
  //محتاج اجمع بيانات المنتج الواحد في اوبجيكت عشان كل البيانات متتلخبطش
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML, //ده مش اينبوت لا انا محتاج القيمه اللي جواها
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // مينفعش اكتفي بالاوبجكت ولازم املي في ارراي عشان لو معملتش ارراي في كل مره بدوس كريت هيحذف اوبجكت القديم وهيضيق اوبجكت جديد بنفس الاسم ونفس الخصاءص ولكن قيم مختلفه
  // اذن هحتاج اضيف كل بيانات منتج في اينديكس ف الاراي عشان *احافظ بالمنتج القديم *واقدر اضيف منتج جديد

  // datapro.push(newpro)//كل ضغطه هيضيف منتج واحد بس

if(title.value!=''
 && price.value!='' 
 && category.value!='' 
 && newpro.count <1001
){

  if (mood === "Creat") {//creat
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
    //update
  } else {
    datapro[index] = newpro;
    mood = "Creat";
    submit.innerHTML = "Creat";
    submit.style.backgroundColor = "#53dae4";
    count.style.display = "block";
  }
  clearpro();

}
  // localstorageمحتاج لطريقه اخزن فيها الاراي عشان متتمسحش بمجرد ما بعمل reload
  localStorage.setItem("product", JSON.stringify(datapro));
  console.log(datapro);

  showData();
};

//clear product//
function clearpro() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "TOTAL";
  total.style.backgroundColor = "rgb(250, 94, 83)";
  count.value = "";
  category.value = "";
}

// read
function showData() {
  countTotal();
  let table = "";
  //اي ارراي فيه داتا في اي مشروع هعمل عليها لووبloop
  // let table = ''//هيضيف ليا اوبجكت اوبجكت ف محتاج اضيف html

  for (let i = 0; i < datapro.length; i++) {
    // table = datapro;//في كل لفه هيجبلي كل ا لمنتجات
    // table = datapro [i];
    // console.log(table);
    //+= عشان كل مره يضيف صف جديد\وميمسحش القديم
    //+1عشان ميبدأش من صفر 
    table += `
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</</td>
    <td>${datapro[i].taxes}</</td>
    <td>${datapro[i].ads}</</td>
    <td>${datapro[i].discount}</</td>
    <td>${datapro[i].total}</</td>
    <td>${datapro[i].category}</</td>
    <td><button  onclick="updatePro(${i})" id="update"> update</button></td>
    <td> <button onclick="deletepro(${i})" id="delete">delete</button></td>
    </tr>
 
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  //deletall
  let btnDelete = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btnDelete.innerHTML = `<button style="background-color: rgb(250, 94, 83);"
        id="deleteall" onclick="deleteAll()" > Delete All (${datapro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
//لازم اخلي البينات موجوده مش بمجرد مااعمل ريلود تختفي ف لازم انادي فانكشن الشو علطول
showData();

//delete product
function deletepro(i) {
  // console.log(i);
  datapro.splice(i, 1); //هو كده هيمسح من الارااي بس
  localStorage.product = JSON.stringify(datapro); //هو كده مسح كل حاجه تمام لكن محدثش البيانات
  //   لازم احدث ال html
  showData();
}

//delete all product
function deleteAll() {
  localStorage.clear();
  datapro.splice(0); //يمسح من البدايه لحد النهايه
  showData();
}

//count //يضيف عدد من المنتجات

//update
function updatePro(i) {
  // console.log(i);
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  category.value = datapro[i].category;
  countTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  submit.style.backgroundColor = "rgb(250, 94, 83)";
  mood = "Update";
  index = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("searh");
  // console.log(id);
  if (id == "searchTilie") {
    searchMood = "title";
    // search.placeholder = "Search By Title";
    //  console.log('toooooooooooooooot');
  } else {
    searchMood = "category";
    // search.placeholder = "Search By Category";
    //  console.log('toooooooooooooooot');
  }
  search.placeholder = "Search by " + searchMood;

 search.value=''
  search.focus();
showData();
  //    console.log(searchMood);
}

function searchData(value) {
  let table = "";
  // console.log(value);
  for (let i = 0; i < datapro.length; i++) {

  if (searchMood === "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        // console.log(i);
        table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</</td>
                <td>${datapro[i].taxes}</</td>
                <td>${datapro[i].ads}</</td>
                <td>${datapro[i].discount}</</td>
                <td>${datapro[i].total}</</td>
                <td>${datapro[i].category}</</td>
                <td><button  onclick="updatePro(${i})" id="update"> update</button></td>
                <td> <button onclick="deletepro(${i})" id="delete">delete</button></td>
                </tr>
             
                `;
      }
    
  } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        // console.log(i);
        table += `
                <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</</td>
                <td>${datapro[i].taxes}</</td>
                <td>${datapro[i].ads}</</td>
                <td>${datapro[i].discount}</</td>
                <td>${datapro[i].total}</</td>
                <td>${datapro[i].category}</</td>
                <td><button  onclick="updatePro(${i})" id="update"> update</button></td>
                <td> <button onclick="deletepro(${i})" id="delete">delete</button></td>
                </tr>
             
                `;
      }
    
  }
  }
  document.getElementById("tbody").innerHTML = table;
}
//clean data
//هعمل فاليديشن للي اللي هيدخله اليوزر
