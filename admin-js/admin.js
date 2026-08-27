localStorage.setItem(
    "nassahProducts",
    JSON.stringify(products)
);

<script>

/* ==========================================
   NASSAH DASHBOARD DATA
========================================== */

function getDashboardProducts() {

    try {

        return JSON.parse(
            localStorage.getItem("nassahProducts")
        ) || [];

    } catch (error) {

        console.error(
            "Unable to load NASSAH products:",
            error
        );

        return [];

    }

}


/* ==========================================
   TOTAL PRODUCTS
========================================== */

function updateTotalProducts() {

    const products =
        getDashboardProducts();

    const totalProducts =
        document.getElementById("totalProducts");

    if (totalProducts) {

        totalProducts.textContent =
            products.length;

    }

}


/* ==========================================
   TOP PRODUCTS
========================================== */

function updateTopProducts() {

    const products =
        getDashboardProducts();

    const container =
        document.getElementById("topProducts");

    if (!container) return;


    container.innerHTML = "";


    if (products.length === 0) {

        container.innerHTML = `

            <div class="dashboard-empty">

                <i class="fa-regular fa-clock"></i>

                <p>No products added yet.</p>

                <a href="products.html">
                    Add your first product
                </a>

            </div>

        `;

        return;

    }


    /*
       Show featured products first,
       then products with highest stock.
    */

    const sortedProducts = [...products]
        .sort((a, b) => {

            if (
                Boolean(b.featured) !==
                Boolean(a.featured)
            ) {

                return Boolean(b.featured)
                    ? 1
                    : -1;

            }

            return Number(b.stock || 0)
                - Number(a.stock || 0);

        })
        .slice(0, 5);


    sortedProducts.forEach(product => {

        const item =
            document.createElement("div");

        item.className =
            "dashboard-product";


        let imageHTML = `

            <div class="dashboard-product-image">

                <i class="fa-regular fa-clock"></i>

            </div>

        `;


        if (product.image) {

            imageHTML = `

                <div class="dashboard-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>

            `;

        }


        item.innerHTML = `

            ${imageHTML}

            <div class="dashboard-product-info">

                <strong>
                    ${product.name}
                </strong>

                <small>
                    ${capitalizeDashboard(
                        product.category || "watch"
                    )}
                </small>

            </div>

            <div class="dashboard-product-price">

                ₦${Number(product.price || 0)
                    .toLocaleString("en-NG")}

            </div>

        `;


        container.appendChild(item);

    });

}


/* ==========================================
   LOW STOCK
========================================== */

function updateLowStock() {

    const products =
        getDashboardProducts();

    const lowStock =
        products.filter(product =>
            Number(product.stock || 0) <= 10
        );

    const element =
        document.getElementById("lowStockCount");

    if (element) {

        element.textContent =
            lowStock.length;

    }

}


/* ==========================================
   CAPITALIZE
========================================== */

function capitalizeDashboard(text) {

    return text
        .charAt(0)
        .toUpperCase()
        + text.slice(1);

}


/* ==========================================
   DASHBOARD REFRESH
========================================== */

function refreshDashboard() {

    updateTotalProducts();

    updateTopProducts();

    updateLowStock();

}


/* ==========================================
   INITIAL LOAD
========================================== */

refreshDashboard();


/*
   Refresh dashboard whenever
   the user returns to this tab.
*/

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key === "nassahProducts"
        ) {

            refreshDashboard();

        }

    }
);


window.addEventListener(
    "focus",
    refreshDashboard
);

</script>