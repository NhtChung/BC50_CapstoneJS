import { Service } from '../services/productService.js';
import { CartItem } from '../model/cartItem.js';
import { Product } from '../model/product.js';

const service = new Service();
let cart = [];

//hiển thị danh sách sản phẩm trang home
const renderList = (productList) => {
  let content = '';
  productList.forEach((ele) => {
    content += 
    `<div class="col-lg-3 col-md-6" style="margin-bottom: 20px;">
      <div class="card text-black h-100">
      <div class="content-overlay"></div>
        <img src=${ele.img} class="card-img" alt="Phone Image" />
        <div class="content-details fadeIn-top">
        <h3 class ='pb-5'>Thông số</h3>
              <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Màn hình:</b></span>
            <span class='text-light'>&nbsp ${ele.screen}</span>
          </div>
          <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Camera sau:</b> ${ele.backCamera}</span>
          </div>
          <div class="d-flex justify-content-start py-1">
            <span class='text-light'><b>Camera trước:</b> ${ele.frontCamera}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="text-center">
            <h5 class="card-title pt-3">${ele.name}</h5>
            <span class="text-muted mb-2">Giá: ${ele.price}</span>
            <span class="text-danger" style="text-decoration: line-through;"><s>${Number(ele.price) + 500}</s></span>
          </div>
          <div class="mt-3 brand-box text-center">
            <span>${ele.type}</span>
          </div>
          <div class="d-flex justify-content-start pt-3">
            <span><b>Mô tả:</b> ${ele.desc}</span>
          </div>
          <button style="margin-bottom: 30px; " type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${ele.id}')">Add to cart</button>
        </div>
      </div>
    </div>`;
    });
  document.getElementById('productList').innerHTML = content;
};

//hiển thị danh sách sản phẩm trong giỏ hàng
const renderCart = (cart) => {
  let content = '';
  cart.forEach((ele) => {
    content += `<div class="product">
  <div class="product__1">
    <div class="product__thumbnail">
      <img src=${ele.product.img} >
    </div>
    <div class="product__details">
      <div style="margin-bottom: 8px;">
        <b>${ele.product.name}</b>
      </div>
      <div style="font-size: 90%;">
        Màn hình: <span class="tertiary">${ele.product.screen}</span>
      </div>
      <div style="font-size: 90%;">
        Camera sau: <span class="tertiary">${ele.product.backCamera}</span>
      </div>
      <div style="font-size: 90%;">
        Camera trước: <span class="tertiary">${ele.product.frontCamera}</span>
      </div>
      <div style="margin-top: 8px;"><a style="background: red;color: white;padding: 5px;border-radius: 8px;" href="#!" onclick ="btnRemove('${ele.product.id}')">Xóa</a></div>
    </div>
  </div>
  <div class="product__2">
    <div class="qty">
      <span style="margin-right:20px;"><b>Số lượng:</b> </span>
      <span class="minus bg-dark" onclick ="btnMinus('${ele.product.id}')">-</span>
      <span class="quantityResult mx-2">${ele.quantity}</span>
      <span class="plus bg-dark" onclick ="btnAdd('${ele.product.id}')">+</span>
    </div>
    <div class="product__price">Giá: <b>$${ele.quantity * ele.product.price}</b></div>
  </div>
</div>`;
  });
  document.getElementById('cartList').innerHTML = content;

  let cartCount = 0;
  cart.forEach((ele) => {
    cartCount += ele.quantity;
  });
  document.getElementById('cartCount').innerHTML = cartCount;

  const subTotal = calculateSubTotal(cart);
  document.getElementById('subTotal').innerHTML = '$' + subTotal;

  const shipping = subTotal > 0 ? 10 : 0;
  document.getElementById('shipping').innerHTML = '$' + shipping;
  
  document.getElementById('tax').innerHTML = '$' + Math.floor(subTotal * 0.1);
  document.getElementById('priceTotal').innerHTML = '$' + Math.floor(subTotal * 1.1 + shipping);
};

// tìm itemCart theo id trong giỏ hàng
const findItemById = (cart, id) => {
  let item;
  cart.forEach((tmp) => {
    if (tmp.product.id == id) {
      item = tmp;
      return;
    }
  });
  return item;
};

//tính tổng tiền sản phẩm trong giỏ hàng
const calculateSubTotal = (cart) => {
  let total = 0;
  cart.forEach((ele) => {
    total += ele.product.price * ele.quantity;
  });
  return total;
};

//load data khi load page: 
                          //hiển thị danh sách sản phẩm trong giỏ hàng trong localStorage
                          //hiển thị danh sách sản phẩm theo api
window.onload = async () => {
  cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  renderCart(cart);
  const productList = await service.getProducts();
  renderList(productList);
};

//sự kiện thêm sản phẩm vào giỏ hàng theo id sản phẩm
window.btnAddToCart = async (productId) => {
  const _product = await service.getProductById(productId);
  const { id, name, price, screen, backCamera, frontCamera, img, desc, type } = _product;
  const product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);
  const newItem = new CartItem(product, 1);
  let cartItem = findItemById(cart, newItem.product.id);
  !cartItem ? cart.push(newItem) : cartItem.quantity++;
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

//Lọc sản phảm theo hãng: samsung, iphone: chuyển về chữ thường để so sánh
document.getElementById('selectList').onchange = async () => {
  const data = await service.getProducts();
  const selectValue = document.getElementById('selectList').value.toLowerCase();
  let filterData = selectValue == 'all' ? data : data.filter((ele) => ele.type.toLowerCase() == selectValue);
  renderList(filterData);
};

// tăng số lượng sản phẩm trong giỏ hàng (dấu cộng sản phẩm)
window.btnAdd = (id) => {
  let item = findItemById(cart, id);
  if (item) item.quantity++;
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

// giảm số lượng sản phẩm trong giỏ hàng (dấu trừ sản phẩm)
window.btnMinus = (id) => {
  let item = findItemById(cart, id);
  if (item) item.quantity--;

  cart = cart.filter((ele) => ele.quantity != 0);
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

//sự kiện nút thanh toán click
window.payNow = () => {
  if (cart.length > 0) {
    Swal.fire({
      icon: 'success',
      title: 'Bạn đã thanh toán thành công!',
      showConfirmButton: false,
      timer: 1500,
    });
    emptyCart();
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Thông báo',
      text: 'Giỏ hàng rỗng!',
    });
  }
};

// xóa tất cả sản phẩm ra khỏi giỏ hàng
window.emptyCart = () => {
  cart = [];
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};
// xóa một sản phẩm ra khỏi giỏ hàng
window.btnRemove = (id) => {
  cart = cart.filter((item) => item.product.id != id);
  renderCart(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};
