document.addEventListener("DOMContentLoaded", function () {
    // Extract URL parameters
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("id");
    const title = params.get("title");
    const description = params.get("description");
    const reward = params.get("reward");

    // Display order details
    document.getElementById("orderTitle").textContent = title;
    document.getElementById("orderDescription").textContent = description;
    document.getElementById("orderReward").textContent = `Reward: ₹${reward}`;

    // Confirm Order Button
    document.getElementById("confirmOrder").addEventListener("click", async function () {
        const confirmAccept = confirm("Do you want to confirm this order?");
        if (!confirmAccept) return;

        // Update Firebase to mark order as taken
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
        import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyAeOS8_0tDWKnfAwLf0GRKr6JaopYj1nnY",
            authDomain: "dormdash-40a10.firebaseapp.com",
            projectId: "dormdash-40a10",
            storageBucket: "dormdash-40a10.firebasestorage.app",
            messagingSenderId: "219135353050",
            appId: "1:219135353050:web:49446a2e74414ebf8105e3"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        await updateDoc(doc(db, "requests", orderId), { taken: true });

        alert("Order Confirmed!");
        window.location.href = "https://dormdash1available.netlify.app/"; // Redirect back to Available Requests
    });
});
