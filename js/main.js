// const userId = 12345; // مثال على userId
// const receiptId = 67890; // مثال على receiptId



// receipt_data
const receipt_ID = document.querySelector('.receipt_ID')

const receiving_way = document.querySelector('.receiving_way')

const sending_way = document.querySelector('.sending_way')

const currency_type_receive = document.querySelector('.currency_type_receive')
const currency_type_send = document.querySelector('.currency_type_send')

const received_amount = document.querySelector('.received_amount')
const sending_amount = document.querySelector('.sending_amount')

const sending_charge = document.querySelector('.sending_charge')
const receiving_charge = document.querySelector('.receiving_charge')


const total_received_amount = document.querySelector('.total_received_amount')
const total_sending_amount = document.querySelector('.total_sending_amount')


const card_img_receive = document.querySelector('.card_img_receive')
const card_img_send = document.querySelector('.card_img_send')

const timeOfReceipt = document.querySelector('.timeOfReceipt')

const statusCase = document.querySelector('.statusCase')

console.log('hello', statusCase);



let userId = 0

const urlParams = new URLSearchParams(window.location.search);
const exchange_id = urlParams.get("exchange_id");

const urlParamsEmail = new URLSearchParams(window.location.search);
const user_email = urlParams.get("email");
// ----------------------------------------------------------------------

// user_data

const userName = document.querySelector('.user_name')


const userEmail = document.querySelector('.userEmail')

const numPhone = document.querySelector('.numberPhone')
const address = document.querySelector('.address')
// console.log('heeeeeeeeeeeeeee', exchange_id);




const apiUrl1 = `https://ha55a.exchange/api/v1/history/get_by_id.php?exchange_id=${exchange_id}`;

const apiUrl2 = `https://ha55a.exchange/api/v1/auth/user-data.php?email=${user_email}`

const requestOptions1 = {
    method: "GET",
    redirect: "follow"
};

const requestOptions2 = {
    method: "GET",
    redirect: "follow"
};


const getReceipt = async () => {

    await fetch(apiUrl1, requestOptions1)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Received Data:", data)


            receipt_ID.innerHTML = data.exchange_id


            receiving_way.innerHTML = data.receive_currency_name
            sending_way.innerHTML = data.send_currency_name
            received_amount.innerHTML = data.receiving_amount + ' '
            sending_amount.innerHTML = data.sending_amount + ' '



            sending_charge.innerHTML = data.sending_charge + ' ' + data.send_currency_symbol
            receiving_charge.innerHTML = data.receiving_charge + ' ' + data.receive_currency_symbol

            currency_type_receive.innerHTML = data.receive_currency_symbol
            currency_type_send.innerHTML = data.send_currency_symbol


            console.log(data.receiving_amount.slice(0, 10));



            total_received_amount.innerHTML = data.receive_currency_symbol + ' ' + Number(data.receiving_amount) + Number(data.receiving_charge)


            total_sending_amount.innerHTML = data.send_currency_symbol + '' + Number(data.sending_amount) + Number(data.sending_charge)


            console.log(data.receive_currency_image);

            console.log(card_img_receive);


            console.log(typeof (data.receive_currency_image));

            card_img_receive.setAttribute("src", data.receive_currency_image);
            card_img_send.setAttribute("src", data.send_currency_image);


            timeOfReceipt.innerHTML = data.created_at


            userId = data.user_id

            if (data.status == 0) {
                statusCase.innerHTML = 'غير مكتمل'
            } else if (data.status == 1) {
                statusCase.innerHTML = 'مكتمل'
            }
            else if (data.status == 3) {
                statusCase.innerHTML = 'مبلغ مسترجع'
            }
            else if (data.status == 2) {
                statusCase.innerHTML = 'قيد الانتظار'
            }
            else if (data.status == 9) {
                statusCase.innerHTML = 'ملغي'
            }
        })
        .catch(error => console.error("Fetch Error:", error));

}

const getUserData = async () => {
    await fetch(apiUrl2, requestOptions2)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            userName.innerHTML = data.data.firstname + ' ' + data.data.lastname
            userEmail.innerHTML = data.data.email
            numPhone.innerHTML = data.data.mobile
            address.innerHTML = JSON.parse(data.data.address).city + " " + JSON.parse(data.data.address).country + " " + JSON.parse(data.data.address).address
            console.log(JSON.parse(data.data.address));

            console.log("Received USER Data:", data)



        })
        .catch(error => console.error("Fetch Error:", error));

}



getReceipt()

getUserData()







document.getElementById("downloadPDF").addEventListener("click", function () {



    const { jsPDF } = window.jspdf; // استدعاء jsPDF

    const receipt = document.getElementById("recipt"); // عنصر الفاتورة

    html2canvas(receipt, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        console.log(canvas.height);

        const imgHeight = ((canvas.height - 200) * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("receipt.pdf");
    });
});
