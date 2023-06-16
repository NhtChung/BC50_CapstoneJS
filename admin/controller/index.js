import { CustomModal, Helper } from './utill.js';
import { Services } from '../services/productService.js';
import { Validate } from './validate.js';
import { Product } from '../model/product.js';

const helper = new Helper();
const service = new Services();
const validate = new Validate();

const renderListProduct = async () => {
  const productList = await service.getProducts();
  //console.log(productList);
  let content = '';
  productList.forEach((ele) => {
    content += ` <tr>
    <td>${ele.id}</td>
    <td><strong>${ele.name}</strong></td>
    <td>$${ele.price}</td>
    <td>${ele.screen}</td>
    <td>${ele.frontCamera}</td>
    <td>${ele.backCamera}</td>
    <td style="text-align: center"><img src=${ele.img} alt="phone-img" width="150" height="150"></td>
    <td>${ele.desc}</td>
    <td>${ele.type}</td>
    <td style="text-align: center;">
      <button style="background: yellow;" class="btn my-3 me-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')" id='btnEdit'>
         Sửa <i class="fa fa-pencil-square ms-2"></i>
      </button>
      <button style="background: red;"  class="btn " onclick ="btnDelete('${ele.id}')" id='btnDelete'>
          Xóa <i class="fa fa-trash ms-2"></i>
       </button>
    </td>
    </tr>`;
  });
  document.getElementById('tableProduct').innerHTML = content;
};

const renderListProductFilter = async (productList) => {
  //console.log(productList);
  let content = '';
  productList.forEach((ele) => {
    content += ` <tr>
    <td>${ele.id}</td>
    <td><strong>${ele.name}</strong></td>
    <td>$${ele.price}</td>
    <td>${ele.screen}</td>
    <td>${ele.frontCamera}</td>
    <td>${ele.backCamera}</td>
    <td style="text-align: center"><img src=${ele.img} alt="phone-img" width="150" height="150"></td>
    <td>${ele.desc}</td>
    <td>${ele.type}</td>
    <td style="text-align: center;">
      <button style="background: yellow;" class="btn my-3 me-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick ="btnEdit('${ele.id}')" id='btnEdit'>
         Sửa <i class="fa fa-pencil-square ms-2"></i>
      </button>
      <button style="background: red;"  class="btn " onclick ="btnDelete('${ele.id}')" id='btnDelete'>
          Xóa <i class="fa fa-trash ms-2"></i>
       </button>
    </td>
    </tr>`;
  });
  document.getElementById('tableProduct').innerHTML = content;
};

window.onload = async () => renderListProduct();

//đóng modal
document.getElementById('btnClose').onclick = () => {
  var modal_ThemCT = document.getElementById("modal-ThemSP");
  modal_ThemCT.style.display = "none";
}

//xóa sản phẩm theo mã ở table
window.btnDelete = async (id) => {
  let res = await CustomModal.alertDelete(
    `Bạn có muốn xóa sản phẩm này không?`
  );
  if (res.isConfirmed) {
    await service.deleteProduct(id);
    renderListProduct();
    CustomModal.alertSuccess(`Xóa sản phẩm thành công!`);
  }
};

//sự kiện mở modal khi bấm thêm mới sp
document.getElementById('btnOpenModal').onclick = () => {
  helper.clearValues();
  var modal_ThemCT = document.getElementById("modal-ThemSP");
  modal_ThemCT.style.display = "block";
  helper.clearTB();
  document.getElementById('btnUpdate').style.display = 'none';
  document.getElementById('btnAddProduct').style.display = 'inline-block';
};

//đóng modal 
document.getElementById("close-ThemSP").onclick = function () {
  var modal_ThemCT = document.getElementById("modal-ThemSP");
  modal_ThemCT.style.display = "none";
}

//mở modal edit và load sản phẩm lên modal
window.btnEdit = async (id) => {
  var modal_ThemCT = document.getElementById("modal-ThemSP");
  modal_ThemCT.style.display = "block";
  helper.clearTB();
  document.getElementById('btnUpdate').style.display = 'inline-block';
  document.getElementById('btnAddProduct').style.display = 'none';

  let data = await service.getProductById(id);
  let arrObjValue = Object.keys(data).map((k) => data[k]);
  arrObjValue.shift(); //xóa pra id 
  helper.fill(arrObjValue);

  //cập nhập sản phẩm
  document.getElementById('btnUpdate').onclick = async () => {
    const productList = await service.getProducts();
    if (!validate.isValid(productList, true)) return;

    const inputs = helper.getInputValue();
    let product = new Product(id, ...inputs);
    await service.updateProduct(product);
    renderListProduct();
    CustomModal.alertSuccess('Cập nhập sản phẩm thành công!');
    var modal_ThemCT = document.getElementById("modal-ThemSP");
    modal_ThemCT.style.display = "none";
  };
};

//thêm sản phẩm mới
document.getElementById('btnAddProduct').onclick = async () => {
  const phoneList = await service.getProducts();
  if (!validate.isValid(phoneList)) return;

  const inputs = helper.getInputValue();
  let phone = new Product('', ...inputs);
  await service.addProduct(phone);
  renderListProduct();
  document.getElementById('formProduct').reset();
  CustomModal.alertSuccess('Thêm sản phẩm thành công!');
  var modal_ThemCT = document.getElementById("modal-ThemSP");
  modal_ThemCT.style.display = "none";
};

//tìm product theo tên
document.getElementById('btnFind').onclick = async () => {
  const data = await service.getProducts();
  const text = document.getElementById('txtFind').value.toLowerCase();
  console.log(text);
  let filterData = data.filter((ele) => ele.name.toLowerCase().includes(text));
  renderListProductFilter(filterData);
};

//xếp sản phẩm tăng theo giá tăng dần
document.getElementById('cbTang').onclick = async () => {
  const data = await service.getProducts();
  data.sort((a, b) => a.price - b.price)
  renderListProductFilter(data);
};

//xếp sản phẩm tăng theo giá giảm dần
document.getElementById('cbGiam').onclick = async () => {
  const data = await service.getProducts();
  data.sort((a, b) => b.price - a.price)
  renderListProductFilter(data);
};