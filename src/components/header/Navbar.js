import { client_data } from "../../config/config.js";

$( () => {
    $("#root-navbar").html(`
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                ${(client_data.img) ? `<img src="${client_data.img}" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">` : ``}
                ${client_data.name}
            </a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link disable" aria-current="page" href="#">${client_data.title_navbar}</a>
                    </li>                    
                    <li class="nav-item">
                        <button type="button" class="btn btn-dark position-relative" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Notificaciones
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="notif-count">
                            0
                            <span class="visually-hidden">unread messages</span>
                        </span>
                        </button>
                    </li>                    
                </ul>
            </div>
        </div>
    `);
})