const { createApp } = Vue;

const API = "/api/products";

createApp({

    data() {
        return {
            products: [],
            name: "",
            description: "",
            price: "",
            stock: ""
        };
    },

    async mounted() {

        if (!localStorage.getItem("token")) {
            window.location.href = "login.html";
            return;
        }

        await this.cargarProductos();
    },

    methods: {

        async cargarProductos() {

            const token =
                localStorage.getItem("token");

            const response = await fetch(API, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data =
                await response.json();

            this.products =
                data.products || data;
        },

        async crearProducto() {

            const token =
                localStorage.getItem("token");

            await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization:
                        `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: this.name,
                    description: this.description,
                    price: this.price,
                    stock: this.stock
                })
            });

            this.name = "";
            this.description = "";
            this.price = "";
            this.stock = "";

            await this.cargarProductos();
        },

        async eliminarProducto(id) {

            const token =
                localStorage.getItem("token");

            await fetch(`${API}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            });

            await this.cargarProductos();
        },

        logout() {

            localStorage.removeItem("token");

            window.location.href =
                "login.html";
        }

    }

}).mount("#app");



async function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const response =
        await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

    const data =
        await response.json();

    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );

        window.location.href =
            "dashboard.html";

    } else {

        document.getElementById(
            "mensaje"
        ).innerText =
            data.message;
    }
}