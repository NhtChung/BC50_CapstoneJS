export class Helper {
  inpArr = ['name', 'price', 'screen', 'backCam', 'frontCam', 'img', 'desc', 'type'];
  valicationArr = ['valicationname', 'valicationprice', 'valicationscreen', 'valicationbackCam', 
                    'valicationfrontCam', 'valicationimg','valicationdesc','valicationtype'];

  getInputValue() {
    return this.inpArr.map((ele) => document.getElementById(ele).value);
  }

  clearValues() {
    this.inpArr.forEach((ele) => {
      document.getElementById(ele).value = '';
    });
  }

  fill(arr) {
    let fields = this.inpArr.map((ele) => document.getElementById(ele));
    fields.forEach((ele, id) => {
      ele.value = arr[id];
    });
  }
  
  clearTB() {
    let fields = this.valicationArr.map((ele) => document.getElementById(ele));
    fields.forEach((ele) => {
      ele.innerHTML = '&#8205';
    });
  }
}

export class CustomModal {
  static alertSuccess = (message) => {
    return Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  static alertDelete = (message) => {
    return Swal.fire({
      title: 'Thông báo!',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý',
    });
  };
}
