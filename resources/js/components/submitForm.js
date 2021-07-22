import Alpine from "alpinejs";

export default Alpine.data("submitForm", () => ({
    phone: null,
    sended: false,
    placeholder: 'Номер телефона',
    submitData() {
        console.log(JSON.stringify(this.phone));
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ phone: this.phone })
        })
        .then((res) => {
            if(!res.success) {
                this.sended = true;
                this.placeholder = 'Спасибо!';
                this.phone = null;
            }
        })
        .catch((res) => {
            if(!res.success) {
                this.sended = false;
                console.log(res.alert.message);
            }
        })
    },
    init() {
        console.log(this.phone);
    }
}));
