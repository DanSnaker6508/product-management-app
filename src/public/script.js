async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
    "/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );

        window.location.href =
            "dashboard.html";

    } else {

        document.getElementById("mensaje")
            .innerText = data.message;

    }
}

function logout() {

    localStorage.removeItem("token");

    window.location.href =
        "login.html";
}

const API = "/api/products";

async function cargarProductos() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(API,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

    const data =
    await response.json();

const products =
    data.products || data;

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
        <div class="card">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <p>Stock: ${product.stock}</p>

            <button onclick="eliminarProducto('${product._id}')">
                Eliminar
            </button>
        </div>
        `;

    });

}

async function crearProducto() {

    const token =
        localStorage.getItem("token");

    await fetch(API, {

        method:"POST",

        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },

        body:JSON.stringify({

            name:
            document.getElementById("name").value,

            description:
            document.getElementById("description").value,

            price:
            document.getElementById("price").value,

            stock:
            document.getElementById("stock").value

        })

    });

    cargarProductos();

}

async function eliminarProducto(id){

    const token =
        localStorage.getItem("token");

    await fetch(`${API}/${id}`,{

        method:"DELETE",

        headers:{
            Authorization:`Bearer ${token}`
        }

    });

    cargarProductos();

}

if (
    window.location.pathname.includes("dashboard") &&
    !localStorage.getItem("token")
) {
    window.location.href = "login.html";
}

if(
window.location.pathname
.includes("dashboard")
){
    cargarProductos();
}