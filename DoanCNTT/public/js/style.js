// Cài đặt mặc định
document.getElementById('showcart').style.display = 'none'

var giohang = new Array();

function themvaogiohang() {
    var boxsp = document.querySelector('.product-esstential').children;
    var hinh = boxsp[0].children[0].src;
    var gia = boxsp[1].children[2].children[0].innerText;
    var tensp = boxsp[1].children[0].innerText;
    var soluong = parseInt(boxsp[1].children[4].children[2].value);
    var sp = new Array(hinh, gia, tensp, soluong);

    // //kiểm tra trong giỏ hàng
    var ktra = 0;
    for (let i = 0; i < giohang.length; i++) {
        if (giohang[i][2] == tensp) {
            ktra = 1;
            giohang[i][3] += soluong;
            break;
        }
    }
    if (ktra == 0) {
        // thêm mới - add to cart
        giohang.push(sp);
    }

    // lưu giỏ hàng lên sessionStorage
    sessionStorage.setItem('giohang', JSON.stringify(giohang));

    // console.log(giohang);
    showcountsp();
}

function showcountsp() {
    var giohangString = sessionStorage.getItem('giohang');
    if (giohangString != undefined)
        giohang = JSON.parse(giohangString);
    document.getElementById("countsp").innerHTML = giohang.length;
}

function showcart() {
    var x = document.getElementById('showcart')
    if (x.style.display == 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block'
        showmycart();
    }
}

function showmycart() {
    var giohangString = sessionStorage.getItem('giohang');
    var giohang = JSON.parse(giohangString);
    var thongtinGH = '';
    var tongDon = 0;
    for (let i = 0; i < giohang.length; i++) {
        var thanhtien = giohang[i][1] * giohang[i][3];
        tongDon += thanhtien;
        thongtinGH += '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td><img src="' + giohang[i][0] + '" alt="" width=100px></td>' +
            '<td>' + giohang[i][2] + '</td>' +
            '<td>' + giohang[i][1] + '</td>' +
            '<td>' + giohang[i][3] + '</td>' +
            '<td>' +
            '   <div>' + thanhtien + '</div>' +
            '</td>' +
            '<td>' +
            '   <button onclick="xoasp(this)" id="xoasp">Xóa</button>' +
            '</td>' +
            '</tr>';
    }
    thongtinGH += '<tr>' +
        '<th colspan="6">Tổng đơn hàng</th>' +
        '<th>' +
        '    <div>' + tongDon + '</div>' +
        '</th>' +
        '</tr>';
    document.getElementById('mycart').innerHTML = thongtinGH;
}

function xoasp(x) {
    var giohangString = sessionStorage.getItem('giohang');
    var giohang = JSON.parse(giohangString);
    // xóa tr
    var tr = x.parentElement.parentElement;
    var tensp = tr.children[2].innerText;
    tr.remove();

    // xóa sp trong mảng
    for (let i = 0; i < giohang.length; i++) {
        if (giohang[i][2] == tensp) {
            giohang.splice(i, 1);
        }

    }
    sessionStorage.removeItem("giohang");
    sessionStorage.setItem('giohang', JSON.stringify(giohang));

    showmycart();
    showcountsp();
}

function thanhtoan() {
    var thtinNH = document.getElementById("thongtinnhanhang").children;
    var hoten = thtinNH[0].children[1].children[0].value;
    var diachi = thtinNH[1].children[1].children[0].value;
    var sdt = thtinNH[2].children[1].children[0].value;
    var email = thtinNH[3].children[1].children[0].value;

    var nguoinhan = new Array(hoten, diachi, sdt, email);
    sessionStorage.setItem('nguoinhan', JSON.stringify(nguoinhan));

    // chuyển trang sang trang donhang
    window.location.assign("order")
}

function showthongtinnguoinhan() {
    var nguoinhan = sessionStorage.getItem("nguoinhan");
    var thongtin = JSON.parse(nguoinhan);

    var tt = '<tr>' +
        '<td width="20%">Họ tên</td>' +
        '<td>' + thongtin[0] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Địa chỉ</td>' +
        '<td>' + thongtin[1] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Điện thoại</td>' +
        '<td>' + thongtin[2] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Email</td>' +
        '<td>' + thongtin[3] + '</td>' +
        '</tr>';
    document.getElementById('thongtinnhanhang').innerHTML = tt;
}

function showmycartDH() {
    var giohangString = sessionStorage.getItem('giohang');
    var giohang = JSON.parse(giohangString);
    var thongtinGH = '';
    var tongDon = 0;
    for (let i = 0; i < giohang.length; i++) {
        var thanhtien = giohang[i][1] * giohang[i][3];
        tongDon += thanhtien;
        thongtinGH += '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td><img src="' + giohang[i][0] + '" alt="" width=100px></td>' +
            '<td>' + giohang[i][2] + '</td>' +
            '<td>' + giohang[i][1] + '</td>' +
            '<td>' + giohang[i][3] + '</td>' +
            '<td>' +
            '   <div>' + thanhtien + '</div>' +
            '</td>' +
            '</tr>';
    }
    thongtinGH += '<tr>' +
        '<th colspan="5">Tổng đơn hàng</th>' +
        '<th>' +
        '    <div>' + tongDon + '</div>' +
        '</th>' +
        '</tr>';
    document.getElementById('mycart').innerHTML = thongtinGH;
}

