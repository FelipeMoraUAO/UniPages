// Elementos principales del header, buscador, carrito y carruseles.
// Si algun elemento no existe en una pagina, se usa optional chaining (?.) para no romper el JS.
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const searchBtn = document.getElementById('searchBtn');
const searchPanel = document.getElementById('searchPanel');
const closeSearch = document.getElementById('closeSearch');
const productSearch = document.getElementById('productSearch');
const cartCount = document.getElementById('cartCount');
const navLinks = document.querySelectorAll('.nav-link');
const productCards = document.querySelectorAll('.product-card');
const cartButtons = document.querySelectorAll('.add-cart');
const contactForm = document.querySelector('.contact-form');
const heroTrack = document.getElementById('heroTrack');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.carousel-dot');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const preloader = document.getElementById('preloader');
const offersTrack = document.getElementById('offersTrack');
const offerSlides = document.querySelectorAll('.offer-slide');
const offerDots = document.querySelectorAll('.offers-dots .carousel-dot');
const prevOffer = document.getElementById('prevOffer');
const nextOffer = document.getElementById('nextOffer');
const CART_STORAGE_KEY = 'unielectronicaCart';
const WHATSAPP_NUMBER = '573157001313';

// Datos ampliados para la pagina de detalle de producto.
// La clave debe coincidir con data-product en pages/tienda.html.
const PRODUCT_DETAILS = {
  'impresora multifuncional oficina empresarial alto volumen': {
    item: 'ITEM-001',
    category: 'Impresoras',
    title: 'Impresora Multifuncional Oficina',
    priceText: '$1.899.900',
    oldPrice: '$2.199.900',
    badge: 'Oferta',
    imageClass: 'shop-product-printer-office',
    summary: 'Equipo multifuncional para oficinas con alto volumen de impresion, copiado y escaneo diario.',
    description: 'Ideal para empresas, areas administrativas y equipos de trabajo que necesitan velocidad, conectividad y rendimiento estable durante la jornada.',
    features: ['Impresion, copia y escaneo', 'Conectividad por red y WiFi', 'Recomendada para alto volumen', 'Soporte y asesoria local'],
  },
  'impresora hogar tinta documentos tareas': {
    item: 'ITEM-002',
    category: 'Impresoras',
    title: 'Impresora para Hogar',
    priceText: '$749.900',
    badge: 'Nuevo',
    imageClass: 'shop-product-printer-home',
    summary: 'Impresora practica para tareas, documentos, trabajos escolares y uso diario en casa.',
    description: 'Una solucion sencilla para familias, estudiantes y teletrabajo que buscan buena calidad sin complicarse con equipos empresariales.',
    features: ['Uso domestico', 'Bajo consumo', 'Facil instalacion', 'Ideal para documentos y tareas'],
  },
  'computador portatil hogar estudio trabajo': {
    item: 'ITEM-003',
    category: 'Computo',
    title: 'Computador Portatil Hogar',
    priceText: '$2.499.900',
    imageClass: 'shop-product-laptop',
    summary: 'Computador para estudio, navegacion, trabajo remoto y productividad diaria.',
    description: 'Pensado para usuarios que necesitan un equipo confiable para clases, oficina, videollamadas, documentos y entretenimiento ligero.',
    features: ['Listo para trabajo y estudio', 'Formato portatil', 'Ideal para hogar', 'Asesoria de configuracion'],
  },
  'lector codigo barras qr huella punto de venta': {
    item: 'ITEM-004',
    category: 'Tecnologia y electronica',
    title: 'Lector Codigos, QR y Huellas',
    priceText: '$399.900',
    imageClass: 'shop-product-reader',
    summary: 'Lectores para puntos de venta, inventarios, control de acceso y operaciones comerciales.',
    description: 'Solucion util para negocios que requieren lectura rapida de codigos, identificacion o apoyo en procesos de registro.',
    features: ['Lectura de codigos y QR', 'Uso en punto de venta', 'Apoyo en inventarios', 'Opciones para control de acceso'],
  },
  'impresora etiquetas codigo barras envios textil': {
    item: 'ITEM-005',
    category: 'Impresoras',
    title: 'Impresora de Etiquetas',
    priceText: '$689.900',
    oldPrice: '$849.900',
    badge: 'Oferta',
    imageClass: 'shop-product-label',
    summary: 'Impresora para etiquetas, codigos de barras, envios y marcacion de productos.',
    description: 'Perfecta para comercios, bodegas, tiendas online e industria textil que necesitan etiquetado claro y constante.',
    features: ['Etiquetas para productos', 'Codigos de barras', 'Uso en envios', 'Aplicaciones comerciales e industriales'],
  },
  'kit tintas suministros impresion oficina': {
    item: 'ITEM-006',
    category: 'Impresoras',
    title: 'Kit de Tintas Originales',
    priceText: '$189.900',
    imageClass: 'shop-product-inks',
    summary: 'Suministros de impresion para mantener tus equipos funcionando con buena calidad.',
    description: 'Recomendado para quienes imprimen con frecuencia y buscan tintas compatibles con un rendimiento estable.',
    features: ['Tintas originales', 'Buena calidad de impresion', 'Para hogar u oficina', 'Asesoria de compatibilidad'],
  },
  'toner laser impresora oficina': {
    item: 'ITEM-007',
    category: 'Impresoras',
    title: 'Toner Laser Alto Rendimiento',
    priceText: '$299.900',
    badge: 'Nuevo',
    imageClass: 'shop-product-toner',
    summary: 'Toner para impresion laser con rendimiento pensado para oficina.',
    description: 'Una opcion para areas que imprimen documentos de forma frecuente y necesitan continuidad en su operacion.',
    features: ['Alto rendimiento', 'Impresion laser', 'Ideal para oficina', 'Consulta compatibilidad antes de comprar'],
  },
  'audifonos parlante sonido audio video': {
    item: 'ITEM-008',
    category: 'Audio y video',
    title: 'Audio para Oficina y Hogar',
    priceText: '$169.900',
    imageClass: 'shop-product-audio',
    summary: 'Soluciones de audio para llamadas, musica, reuniones y entretenimiento.',
    description: 'Accesorios pensados para mejorar la experiencia de sonido en casa, oficina o espacios de trabajo.',
    features: ['Audio para llamadas', 'Uso en hogar u oficina', 'Formato practico', 'Buena relacion precio/uso'],
  },
  'cable usb hdmi red accesorios conectividad': {
    item: 'ITEM-009',
    category: 'Cables',
    title: 'Cables y Accesorios',
    priceText: '$29.900',
    imageClass: 'shop-product-cable',
    summary: 'Cables y accesorios para conexion de equipos, pantallas, redes y perifericos.',
    description: 'Basicos de conectividad para resolver instalaciones, reemplazos o ampliaciones en hogar y oficina.',
    features: ['USB, HDMI y red', 'Accesorios de conectividad', 'Uso domestico y empresarial', 'Disponibilidad segun referencia'],
  },
  'herramientas tecnicas mantenimiento electronica': {
    item: 'ITEM-010',
    category: 'Herramientas',
    title: 'Kit Herramientas Tecnicas',
    priceText: '$219.900',
    imageClass: 'shop-product-tools',
    summary: 'Herramientas para mantenimiento, reparacion y trabajo tecnico.',
    description: 'Kit pensado para tecnicos, estudiantes o usuarios que hacen mantenimiento basico de equipos electronicos.',
    features: ['Trabajo tecnico', 'Mantenimiento de equipos', 'Formato practico', 'Uso en electronica y computo'],
  },
  'componentes modulos electronica sensor placa': {
    item: 'ITEM-011',
    category: 'Tecnologia y electronica',
    title: 'Modulos Electronicos',
    priceText: '$59.900',
    imageClass: 'shop-product-board',
    summary: 'Componentes y modulos para proyectos electronicos, pruebas y aprendizaje.',
    description: 'Opciones para prototipos, estudiantes, reparaciones o proyectos de automatizacion y electronica basica.',
    features: ['Modulos y sensores', 'Proyectos electronicos', 'Aprendizaje y prototipos', 'Consulta referencias disponibles'],
  },
  'alquiler impresora renta mensual empresa': {
    item: 'ITEM-012',
    category: 'Impresoras',
    title: 'Renta Mensual de Impresoras',
    priceText: 'Desde $120.000',
    badge: 'B2B',
    imageClass: 'shop-product-rent',
    summary: 'Servicio de alquiler mensual de impresoras para empresas y oficinas.',
    description: 'Alternativa para negocios que necesitan equipos operativos sin comprar de inmediato, con orientacion segun volumen de impresion.',
    features: ['Renta mensual', 'Solucion para empresas', 'Asesoria por volumen', 'Opciones segun disponibilidad'],
  },
};

// Estado compartido: carrito guardado, slide actual y temporizadores de carruseles.
let cart = loadCart();
let currentSlide = 0;
let currentOffer = 0;
let slideTimer;
let offerTimer;
let isLoopResetting = false;
const heroSlideCount = heroSlides.length;
const offerSlideCount = offerSlides.length;

// Duplica el primer slide del hero para lograr un loop visual mas suave.
if (heroTrack && heroSlideCount > 0) {
  const firstSlideClone = heroSlides[0].cloneNode(true);
  firstSlideClone.classList.add('hero-slide-clone');
  firstSlideClone.setAttribute('aria-hidden', 'true');
  heroTrack.appendChild(firstSlideClone);
}

function hidePreloader() {
  preloader?.classList.add('is-hidden');
}

// Preloader: se oculta cuando la pagina termina de cargar, sin espera artificial.
if (preloader) {
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader, { once: true });
  }
}

// TIENDA: toma todos los productos escritos en pages/tienda.html y los agrupa por data-category.
// Para agregar una categoria nueva, agrega un objeto a "categories" y usa el mismo id en data-category.
function groupShopProductsByCategory() {
  const shopContent = document.querySelector('.shop-content');
  const productGrid = document.querySelector('.shop-content > .shop-products');
  if (!shopContent || !productGrid || productGrid.dataset.grouped === 'true') return;

  // Orden y textos de las secciones de productos en la tienda.
  const categories = [
    { id: 'impresoras', eyebrow: 'Impresion y suministros', title: 'Impresoras' },
    { id: 'computo', eyebrow: 'Trabajo y estudio', title: 'Computo' },
    { id: 'electronica', eyebrow: 'Negocio y componentes', title: 'Tecnologia y electronica' },
    { id: 'audio-video', eyebrow: 'Sonido e imagen', title: 'Audio y video' },
    { id: 'herramientas', eyebrow: 'Trabajo tecnico', title: 'Herramientas' },
    { id: 'cables', eyebrow: 'Conectividad', title: 'Cables y accesorios' },
  ];

  // Subcategorias internas de impresoras.
  // Si agregas una impresora nueva, usa uno de estos ids en data-subcategory.
  const printerSubcategories = [
    { id: 'simple-bn', title: 'Impresoras simple funcion blanco y negro' },
    { id: 'simple-color', title: 'Impresoras simple funcion a color' },
    { id: 'multi-bn', title: 'Impresoras multifuncionales blanco y negro' },
    { id: 'multi-color', title: 'Impresoras multifuncion a color' },
    { id: 'termica-pos', title: 'Impresoras termicas POS' },
    { id: 'termica-etiquetas', title: 'Impresoras termicas etiquetas' },
    { id: 'carnetizadoras', title: 'Impresoras carnetizadoras' },
  ];

  const cards = Array.from(productGrid.querySelectorAll('.shop-product-card'));
  const fragment = document.createDocumentFragment();

  categories.forEach((category) => {
    // Busca las tarjetas que pertenezcan a la categoria actual.
    const categoryCards = cards.filter((card) => card.dataset.category === category.id);
    if (categoryCards.length === 0) return;

    // Crea la seccion visual de categoria y mueve dentro sus productos.
    const section = document.createElement('section');
    section.className = 'shop-category-section';
    section.id = category.id;

    const countText = categoryCards.length === 1 ? '1 producto' : `${categoryCards.length} productos`;
    section.innerHTML = `
      <div class="shop-category-heading">
        <div>
          <p class="eyebrow">${category.eyebrow}</p>
          <h2>${category.title}</h2>
        </div>
        <span>${countText}</span>
      </div>
      <div class="shop-products products-grid"></div>
    `;

    const sectionGrid = section.querySelector('.shop-products');

    if (category.id === 'impresoras') {
      sectionGrid.remove();

      const subcategoriesWrapper = document.createElement('div');
      subcategoriesWrapper.className = 'shop-subcategories';

      printerSubcategories.forEach((subcategory) => {
        const subcategoryCards = categoryCards.filter((card) => card.dataset.subcategory === subcategory.id);
        const subsection = document.createElement('section');
        subsection.className = `shop-subcategory${subcategoryCards.length === 0 ? ' is-empty' : ''}`;
        subsection.id = `impresoras-${subcategory.id}`;

        const countText = subcategoryCards.length === 1 ? '1 producto' : `${subcategoryCards.length} productos`;
        subsection.innerHTML = `
          <div class="shop-subcategory-heading">
            <h3>${subcategory.title}</h3>
            <span>${countText}</span>
          </div>
          <div class="shop-products products-grid"></div>
        `;

        const subsectionGrid = subsection.querySelector('.shop-products');
        if (subcategoryCards.length === 0) {
          subsectionGrid.innerHTML = '<p class="shop-empty-note">Pendiente por agregar productos de esta subcategoria.</p>';
        } else {
          subcategoryCards.forEach((card) => subsectionGrid.appendChild(card));
        }

        subcategoriesWrapper.appendChild(subsection);
      });

      section.appendChild(subcategoriesWrapper);
    } else {
      categoryCards.forEach((card) => sectionGrid.appendChild(card));
    }

    fragment.appendChild(section);
  });

  productGrid.replaceWith(fragment);
}

groupShopProductsByCategory();

// TIENDA: agrega un boton directo de WhatsApp a cada producto.
// Este boton salta el carrito y envia solo el producto seleccionado.
function addDirectBuyButtons() {
  document.querySelectorAll('.shop-page .shop-product-card').forEach((card) => {
    if (card.querySelector('.buy-whatsapp')) return;

    const product = getProductInfo(card);
    const message = encodeURIComponent(`Hola, quiero comprar o cotizar este producto:\n\n- ${product.title}\nITEM: ${product.item}\nPrecio: ${product.priceText}`);
    const button = document.createElement('a');
    button.className = 'buy-whatsapp';
    button.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    button.target = '_blank';
    button.rel = 'noopener';
    button.textContent = 'Comprar';
    card.appendChild(button);
  });
}

addDirectBuyButtons();

// TIENDA: muestra el codigo ITEM visible en cada tarjeta para vendedores.
function addProductItemLabels() {
  document.querySelectorAll('.shop-page .shop-product-card').forEach((card) => {
    if (card.querySelector('.product-item-code')) return;

    const item = card.dataset.item || 'Sin ITEM';
    const title = card.querySelector('h3');
    const label = document.createElement('p');
    label.className = 'product-item-code';
    label.textContent = `ITEM: ${item}`;
    title?.insertAdjacentElement('afterend', label);
  });
}

addProductItemLabels();

// TIENDA: al hacer clic en una tarjeta, abre la pagina de detalle del producto.
// Los botones internos quedan excluidos para que "Agregar" y "Comprar" sigan funcionando normal.
function enableProductDetailLinks() {
  document.querySelectorAll('.shop-page .shop-product-card').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');

    const openDetail = () => {
      const productId = card.dataset.product;
      if (!productId) return;
      window.location.href = `producto.html?producto=${encodeURIComponent(productId)}`;
    };

    card.addEventListener('click', (event) => {
      if (event.target.closest('button, a')) return;
      openDetail();
    });

    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      openDetail();
    });
  });
}

enableProductDetailLinks();

// PAGINA PRODUCTO: pinta la informacion ampliada segun el parametro ?producto=...
function renderProductDetailPage() {
  const detailPage = document.querySelector('.product-detail-page');
  if (!detailPage) return;

  const productId = new URLSearchParams(window.location.search).get('producto');
  const product = PRODUCT_DETAILS[productId];
  const title = document.getElementById('productDetailTitle');
  const category = document.getElementById('productDetailCategory');
  const item = document.getElementById('productDetailItem');
  const price = document.getElementById('productDetailPrice');
  const oldPrice = document.getElementById('productDetailOldPrice');
  const summary = document.getElementById('productDetailSummary');
  const description = document.getElementById('productDetailDescription');
  const features = document.getElementById('productDetailFeatures');
  const gallery = document.getElementById('productDetailGallery');
  const mainImage = document.getElementById('productDetailMainImage');
  const addButton = document.getElementById('productDetailAdd');
  const buyButton = document.getElementById('productDetailBuy');

  if (!product) {
    detailPage.innerHTML = `
      <section class="product-detail-empty">
        <h1>Producto no encontrado</h1>
        <p>Vuelve a la tienda para seleccionar un producto disponible.</p>
        <a class="btn-primary" href="tienda.html">Ir a la tienda</a>
      </section>
    `;
    return;
  }

  title.textContent = product.title;
  document.title = `${product.title} | Unielectronica`;
  category.textContent = product.category;
  item.textContent = `ITEM: ${product.item}`;
  price.textContent = product.priceText;
  oldPrice.textContent = product.oldPrice || '';
  oldPrice.hidden = !product.oldPrice;
  summary.textContent = product.summary;
  description.textContent = product.description;
  mainImage.className = `shop-product-media ${product.imageClass}`;
  features.innerHTML = product.features.map((feature) => `<li>${feature}</li>`).join('');
  gallery.innerHTML = [1, 2, 3].map((item) => `
    <button class="product-detail-thumb${item === 1 ? ' active' : ''}" type="button" aria-label="Imagen ${item} de ${product.title}">
      <span class="shop-product-media ${product.imageClass}" aria-hidden="true"></span>
    </button>
  `).join('');
  gallery.querySelectorAll('.product-detail-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      gallery.querySelectorAll('.product-detail-thumb').forEach((item) => item.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  const productForCart = {
    id: productId,
    item: product.item,
    title: product.title,
    priceText: product.priceText,
    price: parsePrice(product.priceText),
    imageClass: product.imageClass,
  };
  const message = encodeURIComponent(`Hola, quiero comprar o cotizar este producto:\n\n- ${product.title}\nITEM: ${product.item}\nPrecio: ${product.priceText}`);

  addButton?.addEventListener('click', () => {
    addToCart(productForCart);
    addButton.textContent = 'Agregado';
    openCart();
    window.setTimeout(() => {
      addButton.textContent = 'Agregar al carrito';
    }, 1200);
  });

  if (buyButton) {
    buyButton.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }
}

renderProductDetailPage();

// Menu responsive: abre/cierra el menu en pantallas pequenas.
menuBtn?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

// Cierra el menu movil cuando el usuario entra a algun enlace.
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

// Si la pantalla vuelve a escritorio, se asegura de cerrar el menu movil.
window.addEventListener('resize', () => {
  if (window.innerWidth > 740) {
    mainNav?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }
});

// Panel de busqueda del header.
searchBtn?.addEventListener('click', () => {
  searchPanel.classList.add('open');
  searchPanel.setAttribute('aria-hidden', 'false');
  productSearch?.focus();
});

closeSearch?.addEventListener('click', () => {
  searchPanel.classList.remove('open');
  searchPanel.setAttribute('aria-hidden', 'true');
});

// Buscador: compara lo escrito contra el texto visible y data-product de cada tarjeta.
productSearch?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  productCards.forEach((card) => {
    const productText = `${card.textContent} ${card.dataset.product}`.toLowerCase();
    card.classList.toggle('is-hidden', query !== '' && !productText.includes(query));
  });
});

// Lee el carrito desde localStorage para que no se pierda al cambiar de pagina.
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// Guarda el carrito actualizado.
function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

// Convierte precios tipo "$1.899.900" en numero para calcular subtotales.
function parsePrice(value) {
  const cleanValue = value.replace(/[^\d]/g, '');
  return Number(cleanValue) || 0;
}

// Formatea numeros como moneda colombiana.
function formatPrice(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

// Extrae titulo, precio e imagen desde una tarjeta de producto para enviarla al carrito.
function getProductInfo(card) {
  const title = card.querySelector('h3')?.textContent.trim() || 'Producto Unielectronica';
  const priceText = card.querySelector('.price')?.childNodes[0]?.textContent.trim() || card.querySelector('p:not(.rating)')?.textContent.trim() || '$0';
  const imageElement = card.querySelector('.shop-product-media, .product-image');
  const imageClass = imageElement
    ? Array.from(imageElement.classList).filter((className) => className !== 'shop-product-media' && className !== 'product-image').join(' ')
    : '';

  return {
    id: card.dataset.product || title.toLowerCase().replace(/\s+/g, '-'),
    item: card.dataset.item || 'Sin ITEM',
    title,
    priceText,
    price: parsePrice(priceText),
    imageClass,
  };
}

function getCartTotalItems() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Calcula el valor total mostrado en el drawer del carrito.
function getCartSubtotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Actualiza el numerito rojo del carrito en el header.
function updateCartCount() {
  if (cartCount) cartCount.textContent = getCartTotalItems();
}

// Crea el panel lateral del carrito por JavaScript para reutilizarlo en todas las paginas.
function createCartDrawer() {
  const drawer = document.createElement('aside');
  drawer.className = 'cart-drawer';
  drawer.id = 'cartDrawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <div class="cart-overlay" data-cart-close></div>
    <div class="cart-panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
      <div class="cart-header">
        <div>
          <span>Tu compra</span>
          <h2 id="cartTitle">Carrito</h2>
        </div>
        <button class="cart-close" type="button" data-cart-close aria-label="Cerrar carrito">&times;</button>
      </div>
      <div class="cart-body" id="cartItems"></div>
      <div class="cart-footer">
        <div class="cart-subtotal">
          <span>Subtotal</span>
          <strong id="cartSubtotal">$0</strong>
        </div>
        <a class="cart-checkout" id="cartCheckout" href="#" target="_blank" rel="noopener">Finalizar por WhatsApp</a>
        <button class="cart-clear" id="cartClear" type="button">Vaciar carrito</button>
      </div>
    </div>
  `;

  document.body.appendChild(drawer);
  return drawer;
}

const cartDrawer = createCartDrawer();
const cartItemsContainer = cartDrawer.querySelector('#cartItems');
const cartSubtotal = cartDrawer.querySelector('#cartSubtotal');
const cartCheckout = cartDrawer.querySelector('#cartCheckout');
const cartClear = cartDrawer.querySelector('#cartClear');

// Abre/cierra el drawer lateral del carrito.
function openCart() {
  cartDrawer.classList.add('open');
  cartDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('cart-open');
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartDrawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cart-open');
}

// Construye el texto que se envia por WhatsApp al finalizar la cotizacion.
function getCheckoutMessage() {
  const lines = cart.map((item) => `- ${item.title} | ITEM: ${item.item || 'Sin ITEM'} | x${item.quantity}: ${formatPrice(item.price * item.quantity)}`);
  return encodeURIComponent(`Hola, quiero cotizar estos productos:\n\n${lines.join('\n')}\n\nSubtotal: ${formatPrice(getCartSubtotal())}`);
}

// Dibuja el contenido del carrito: estado vacio, productos, subtotal y enlace de WhatsApp.
function renderCart() {
  updateCartCount();

  if (!cartItemsContainer || !cartSubtotal || !cartCheckout) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <strong>Tu carrito esta vacio</strong>
        <p>Agrega productos desde la tienda para cotizarlos por WhatsApp.</p>
      </div>
    `;
    cartSubtotal.textContent = formatPrice(0);
    cartCheckout.setAttribute('href', '#');
    cartCheckout.classList.add('disabled');
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item) => `
    <article class="cart-item" data-cart-id="${item.id}">
      <div class="cart-item-image ${item.imageClass}" aria-hidden="true"></div>
      <div class="cart-item-info">
        <h3>${item.title}</h3>
        <span class="cart-item-code">ITEM: ${item.item || 'Sin ITEM'}</span>
        <p>${item.priceText}</p>
        <div class="cart-item-actions">
          <button type="button" data-cart-action="decrease" aria-label="Restar ${item.title}">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-cart-action="increase" aria-label="Sumar ${item.title}">+</button>
          <button class="cart-remove" type="button" data-cart-action="remove">Eliminar</button>
        </div>
      </div>
    </article>
  `).join('');

  cartSubtotal.textContent = formatPrice(getCartSubtotal());
  cartCheckout.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${getCheckoutMessage()}`;
  cartCheckout.classList.remove('disabled');
}

// Agrega un producto al carrito o aumenta su cantidad si ya existe.
function addToCart(product) {
  const currentItem = cart.find((item) => item.id === product.id);

  if (currentItem) {
    currentItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
}

// Controla botones internos del carrito: sumar, restar o eliminar.
function updateCartItem(id, action) {
  const item = cart.find((cartItem) => cartItem.id === id);
  if (!item) return;

  if (action === 'increase') item.quantity += 1;
  if (action === 'decrease') item.quantity -= 1;
  if (action === 'remove' || item.quantity <= 0) {
    cart = cart.filter((cartItem) => cartItem.id !== id);
  }

  saveCart();
  renderCart();
}

// Botones "Agregar" de cada producto.
cartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    if (!card) return;

    addToCart(getProductInfo(card));
    button.textContent = 'Agregado';
    openCart();

    setTimeout(() => {
      button.textContent = 'Agregar';
    }, 1200);
  });
});

// Boton de carrito del header.
document.querySelectorAll('.cart-btn').forEach((button) => {
  button.addEventListener('click', openCart);
});

// Delegacion de eventos dentro del carrito: cerrar, sumar, restar, eliminar.
cartDrawer.addEventListener('click', (event) => {
  const closeTarget = event.target.closest('[data-cart-close]');
  const actionButton = event.target.closest('[data-cart-action]');

  if (closeTarget) {
    closeCart();
    return;
  }

  if (actionButton) {
    const item = actionButton.closest('.cart-item');
    updateCartItem(item?.dataset.cartId, actionButton.dataset.cartAction);
  }
});

// Vacia todo el carrito.
cartClear?.addEventListener('click', () => {
  cart = [];
  saveCart();
  renderCart();
});

// Escape cierra el carrito.
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCart();
});

renderCart();

// Formularios de contacto: evita recargar la pagina y muestra confirmacion simple.
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  window.alert('Gracias por escribirnos. Te contactaremos pronto.');
  contactForm.reset();
});

// Carrusel principal del home: actualiza el punto activo.
function updateHeroDots(index) {
  const activeIndex = (index + heroSlideCount) % heroSlideCount;

  heroDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === activeIndex);
  });
}

// Mueve visualmente el carrusel principal.
function moveHeroTrack(index, animate = true) {
  heroTrack.style.transition = animate ? 'transform 0.55s ease' : 'none';
  heroTrack.style.transform = `translateX(-${index * 100}%)`;
}

// Muestra un slide del hero. Maneja inicio, final y loop.
function showSlide(index) {
  if (!heroTrack || heroSlideCount === 0 || isLoopResetting) return;

  if (index >= heroSlideCount) {
    currentSlide = heroSlideCount;
    updateHeroDots(0);
    moveHeroTrack(currentSlide);
    return;
  }

  if (index < 0) {
    currentSlide = heroSlideCount - 1;
    updateHeroDots(currentSlide);
    moveHeroTrack(currentSlide);
    return;
  }

  currentSlide = index;
  updateHeroDots(currentSlide);
  moveHeroTrack(currentSlide);
}

// Cuando llega al clon del primer slide, vuelve al primer slide real sin salto visible.
heroTrack?.addEventListener('transitionend', () => {
  if (currentSlide !== heroSlideCount) return;

  isLoopResetting = true;
  currentSlide = 0;
  moveHeroTrack(0, false);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      heroTrack.style.transition = 'transform 0.55s ease';
      isLoopResetting = false;
    });
  });
});

// Reinicia el temporizador automatico del carrusel principal.
function restartCarousel() {
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
}

prevSlide?.addEventListener('click', () => {
  showSlide(currentSlide - 1);
  restartCarousel();
});

nextSlide?.addEventListener('click', () => {
  showSlide(currentSlide + 1);
  restartCarousel();
});

heroDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
    restartCarousel();
  });
});

if (heroSlideCount > 0) {
  showSlide(0);
  restartCarousel();
}

function updateOfferDots(index) {
  offerDots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });

  offerSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === index);
  });
}

function showOffer(index) {
  if (!offersTrack || offerSlideCount === 0) return;

  currentOffer = (index + offerSlideCount) % offerSlideCount;
  offersTrack.style.transform = `translateX(-${currentOffer * 100}%)`;
  updateOfferDots(currentOffer);
}

function restartOffersCarousel() {
  window.clearInterval(offerTimer);
  offerTimer = window.setInterval(() => {
    showOffer(currentOffer + 1);
  }, 5500);
}

prevOffer?.addEventListener('click', () => {
  showOffer(currentOffer - 1);
  restartOffersCarousel();
});

nextOffer?.addEventListener('click', () => {
  showOffer(currentOffer + 1);
  restartOffersCarousel();
});

offerDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showOffer(index);
    restartOffersCarousel();
  });
});

if (offerSlideCount > 0) {
  showOffer(0);
  restartOffersCarousel();
}

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 120;

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href?.startsWith('#')) return;

    const section = document.querySelector(href);
    if (!section) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
  });
});
