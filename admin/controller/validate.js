export class Validate {
  messageSwitch = (isFalse, idTB, message = '') => {
    if (isFalse == false) {
      document.getElementById(idTB).style.display = 'block';
      document.getElementById(idTB).innerHTML = message;
      document.getElementById(idTB).style.color = 'red';
      return false;
    } else if (isFalse == true) {
      document.getElementById(idTB).innerHTML = '&#8205';
      return true;
    }
  };

  isNotEmpty(id, idTB) {
    let text = document.getElementById(id).value.trim();
    return text == ''
      ? this.messageSwitch(false, idTB, `(*)Chưa nhập dữ liệu!`)
      : this.messageSwitch(true, idTB);
  }

  isSelected(id, idTB) {
    let theSelect = document.getElementById(id);
    return theSelect.value === null || theSelect.value === "" ? this.messageSwitch(false, idTB, '(*)Chưa chọn option') : this.messageSwitch(true, idTB);
  }

  isMatch(id, idTB) {
    let text = document.getElementById(id).value;
    return !text.match(/^[0-9]+$/)
      ? this.messageSwitch(false, idTB, '(*)Giá phải là số')
      : this.messageSwitch(true, idTB);
  }

  isNotExist(productList, isUpdate = false) {
    if (isUpdate) return this.messageSwitch(true, 'valicationname');
    for (let i = 0; i < productList.length; i++) {
      if (productList[i].name == document.getElementById('name').value) {
        return this.messageSwitch(false, 'valicationname', '(*)Điện thoại này đã tồn tại (tên điện thoại)');
      }
    }
    return this.messageSwitch(true, 'valicationname');
  }

  isValid(productList, isUpdate) {
    let valid = true;
    valid &= this.isNotEmpty('name', 'valicationname') && this.isNotExist(productList, isUpdate);
    valid &= this.isNotEmpty('price', 'valicationprice') && this.isMatch('price', 'valicationprice');
    valid &= this.isNotEmpty('screen', 'valicationscreen');
    valid &= this.isNotEmpty('backCam', 'valicationbackCam');
    valid &= this.isNotEmpty('frontCam', 'valicationfrontCam');
    valid &= this.isNotEmpty('img', 'valicationimg');
    valid &= this.isNotEmpty('desc', 'valicationdesc');
    valid &= this.isSelected('type', 'valicationtype');
    return valid;
  }
}
