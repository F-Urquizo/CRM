export const menuAdmin = [
  {
    id: 1,
    title: "PRINCIPAL",
    listItems: [
      {
        id: 1,
        title: "Inicio",
        url: "/inicio",
        icon: "home.png",
      },
      {
        id: 2,
        title: "Perfil",
        url: "/users/1",
        icon: "perfil.webp",
      },
    ],
  },
  {
    id: 2,
    title: "LISTAS",
    listItems: [
      {
        id: 1,
        title: "Donadores",
        url: "/usuarios",
        icon: "donadores.png",
      },
      {
        id: 2,
        title: "Donaciones",
        url: "/products",
        icon: "donaciones.png",
      },
      {
        id: 3,
        title: "Proyectos",
        url: "/orders",
        icon: "proyecto.png",
      },
    ],
  },
  {
    id: 3,
    title: "ESTADÍSTICAS",
    listItems: [
      {
        id: 1,
        title: "Donadores",
        url: "/usuarios",
        icon: "donadoresEstadisticas.png",
      },
      {
        id: 2,
        title: "Donaciones",
        url: "/donaciones",
        icon: "donacionesEstadisticas.png",
      },
      {
        id: 3,
        title: "Proyectos",
        url: "/proyectos",
        icon: "proyectoEstadisticas.png",
      },
    ],
  },
  {
    id: 4,
    title: "MANTENIMIENTO",
    listItems: [
      {
        id: 1,
        title: "Ajustes",
        url: "/ajustes",
        icon: "ajustes.png",
      },
    ],
  },
];
