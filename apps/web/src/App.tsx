import { useRef, useState } from 'react'
import {
  ArrowDownWideNarrow,
  Bell,
  Box,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Layers3,
  Plus,
  Printer,
  Search,
  ShoppingBag,
  UploadCloud,
} from 'lucide-react'
import './App.css'

type View = 'catalog' | 'orders' | 'materials'

const categories = ['Усі моделі', 'Дім', 'Організація', 'Аксесуари', 'Іграшки']

const models = [
  {
    id: 1,
    name: 'Органайзер Grid',
    category: 'Організація',
    price: 240,
    time: '3 год 20 хв',
    material: 'PLA',
    color: 'sage',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85',
    tag: 'Бестселер',
  },
  {
    id: 2,
    name: 'Підставка Arc',
    category: 'Дім',
    price: 180,
    time: '2 год 10 хв',
    material: 'PETG',
    color: 'coral',
    image:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=85',
    tag: 'Нове',
  },
  {
    id: 3,
    name: 'Кабельний кліпс Loop',
    category: 'Аксесуари',
    price: 65,
    time: '35 хв',
    material: 'PLA',
    color: 'blue',
    image:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=85',
    tag: '',
  },
  {
    id: 4,
    name: 'Вазон Pebble',
    category: 'Дім',
    price: 320,
    time: '4 год 45 хв',
    material: 'PLA',
    color: 'yellow',
    image:
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85',
    tag: 'Популярне',
  },
  {
    id: 5,
    name: 'Механічна жабка',
    category: 'Іграшки',
    price: 290,
    time: '3 год 50 хв',
    material: 'PETG',
    color: 'mint',
    image:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=85',
    tag: '',
  },
  {
    id: 6,
    name: 'Лоток Stack',
    category: 'Організація',
    price: 210,
    time: '2 год 55 хв',
    material: 'PLA',
    color: 'lavender',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=85',
    tag: '',
  },
]

const materials = [
  { name: 'PLA', description: 'Для декору й побутових речей', colors: ['#e5ad60', '#e7e1d4', '#718f7b'], price: 'від 4 грн/г' },
  { name: 'PETG', description: 'Міцний, гнучкий, вологостійкий', colors: ['#d8664a', '#415e78', '#d2d5cb'], price: 'від 5 грн/г' },
  { name: 'ABS', description: 'Для деталей із підвищеним навантаженням', colors: ['#303a3e', '#e7e1d4', '#d8664a'], price: 'від 6 грн/г' },
]

function App() {
  const [activeView, setActiveView] = useState<View>('catalog')
  const [activeCategory, setActiveCategory] = useState('Усі моделі')
  const [search, setSearch] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState('Усі матеріали')
  const [sortAscending, setSortAscending] = useState(false)
  const [cart, setCart] = useState<Record<number, number>>({})
  const [selectedFile, setSelectedFile] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const visibleModels = models
    .filter((model) => activeCategory === 'Усі моделі' || model.category === activeCategory)
    .filter((model) => selectedMaterial === 'Усі матеріали' || model.material === selectedMaterial)
    .filter((model) => model.name.toLowerCase().includes(search.toLowerCase()))
    .sort((first, second) => sortAscending ? first.price - second.price : first.id - second.id)

  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)
  const cartTotal = models.reduce((total, model) => total + model.price * (cart[model.id] ?? 0), 0)
  const pageTitle = activeView === 'catalog' ? 'Каталог моделей' : activeView === 'orders' ? 'Моє замовлення' : 'Матеріали'

  function addToCart(modelId: number) {
    setCart((currentCart) => ({
      ...currentCart,
      [modelId]: (currentCart[modelId] ?? 0) + 1,
    }))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#catalog" onClick={() => setActiveView('catalog')}>
          <span className="brand-mark"><Layers3 size={21} strokeWidth={2.2} /></span>
          <span className="brand-name">forma<span>3D</span></span>
        </a>

        <div className="sidebar-label">РОБОЧИЙ ПРОСТІР</div>
        <nav className="main-nav" aria-label="Головна навігація">
          <button className={activeView === 'catalog' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveView('catalog')}>
            <Box size={18} /> Каталог <ChevronRight className="nav-chevron" size={15} />
          </button>
          <button className={activeView === 'orders' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveView('orders')}>
            <ShoppingBag size={18} /> Моє замовлення {cartCount > 0 && <span className="nav-count">{cartCount}</span>}
          </button>
          <button className={activeView === 'materials' ? 'nav-item active' : 'nav-item'} onClick={() => setActiveView('materials')}>
            <Layers3 size={18} /> Матеріали
          </button>
        </nav>

        <div className="sidebar-divider" />
        <div className="sidebar-note">
          <span className="note-icon"><Printer size={17} /></span>
          <div><strong>Майстерня онлайн</strong><span>Приймаємо замовлення</span></div>
          <span className="online-dot" />
        </div>

        <div className="sidebar-bottom">
          <button className="help-link" type="button"><CircleHelp size={17} /> Потрібна допомога?</button>
          <button className="user-profile" type="button">
            <span className="avatar">ОК</span>
            <span className="user-copy"><strong>Олена Коваль</strong><small>Особистий кабінет</small></span>
            <ChevronRight size={15} />
          </button>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div className="breadcrumbs"><span>FORMA 3D</span><ChevronRight size={14} /><strong>{pageTitle}</strong></div>
          <div className="topbar-actions">
            <span className="delivery-note"><span className="online-dot" /> Відправка за 2–4 дні</span>
            <button className="icon-button notification-button" aria-label="Сповіщення"><Bell size={18} /><i /></button>
            <button className="cart-button" onClick={() => setActiveView('orders')} aria-label={`Замовлення, товарів: ${cartCount}`}>
              <ShoppingBag size={17} /><span>Замовлення</span><b>{cartCount}</b>
            </button>
          </div>
        </header>

        <main className="content">
          {activeView === 'catalog' && <>
            <section className="welcome-row">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> МАЙСТЕРНЯ 3D-ДРУКУ</div>
                <h1>Річ, якої бракує.<br /><span>Надрукуємо.</span></h1>
                <p className="welcome-copy">Обирай готову модель або завантаж свій файл. Ми подбаємо про решту.</p>
              </div>
              <div className="welcome-stats">
                <div><strong>6</strong><span>моделей у каталозі</span></div>
                <div><strong>від 65 ₴</strong><span>вартість друку</span></div>
              </div>
            </section>

            <section className="upload-banner" aria-label="Друк власної моделі">
              <div className="upload-icon"><UploadCloud size={22} /></div>
              <div className="upload-copy">
                <strong>{selectedFile || 'Є власна 3D-модель?'}</strong>
                <span>{selectedFile ? 'Файл вибрано. Можна додати ще або перейти до каталогу.' : 'Завантаж STL, OBJ або 3MF — розрахуємо вартість.'}</span>
              </div>
              <input ref={fileInput} className="file-input" type="file" accept=".stl,.obj,.3mf" onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? '')} />
              <button className="upload-button" onClick={() => fileInput.current?.click()} type="button">
                {selectedFile ? <><Check size={16} /> Файл вибрано</> : <><Plus size={16} /> Завантажити файл</>}
              </button>
            </section>

            <section className="catalog-section" id="catalog">
              <div className="section-heading">
                <div><div className="eyebrow">ЗНАЙДИ СВОЄ</div><h2>Популярні моделі</h2></div>
                <span className="result-count">{visibleModels.length} моделей</span>
              </div>

              <div className="catalog-tools">
                <div className="category-tabs" role="tablist" aria-label="Категорії моделей">
                  {categories.map((category) => <button key={category} className={activeCategory === category ? 'category-tab selected' : 'category-tab'} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}
                </div>
                <div className="filter-row">
                  <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Знайти модель" aria-label="Знайти модель" /></label>
                  <label className="material-select"><span>Матеріал</span><select value={selectedMaterial} onChange={(event) => setSelectedMaterial(event.target.value)} aria-label="Фільтр за матеріалом"><option>Усі матеріали</option><option>PLA</option><option>PETG</option></select></label>
                  <button className="sort-button" onClick={() => setSortAscending((current) => !current)} type="button"><ArrowDownWideNarrow size={16} /> {sortAscending ? 'Спочатку дешевші' : 'Популярні'}</button>
                </div>
              </div>

              {visibleModels.length > 0 ? <div className="product-grid">
                {visibleModels.map((model) => <article className="product-card" key={model.id}>
                  <div className={`product-image ${model.color}`}>
                    <img src={model.image} alt={model.name} loading="lazy" />
                    {model.tag && <span className="product-tag">{model.tag}</span>}
                    <span className="image-material">{model.material}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{model.category}</div>
                    <h3>{model.name}</h3>
                    <div className="product-meta"><span><Clock3 size={14} /> {model.time}</span><span>{model.material}</span></div>
                    <div className="product-buy"><strong>{model.price} ₴</strong><button onClick={() => addToCart(model.id)} aria-label={`Додати ${model.name} до замовлення`} title="Додати до замовлення"><Plus size={19} /></button></div>
                  </div>
                </article>)}
              </div> : <div className="empty-results"><Search size={22} /><strong>Нічого не знайдено</strong><span>Спробуй інший запит або категорію.</span></div>}
            </section>
            <footer className="page-footer"><span>FORMA 3D <span className="footer-separator">/</span> Точність у кожному шарі</span><span>© 2026</span></footer>
          </>}

          {activeView === 'orders' && <section className="secondary-view">
            <div className="eyebrow"><span className="eyebrow-line" /> ВАШ КОШИК</div>
            <h1>Моє замовлення</h1>
            <p className="secondary-intro">Перевір моделі перед оформленням запиту.</p>
            {cartCount > 0 ? <div className="order-layout">
              <div className="order-list">{models.filter((model) => cart[model.id]).map((model) => <article className="order-item" key={model.id}>
                <img src={model.image} alt="" />
                <div className="order-item-copy"><strong>{model.name}</strong><span>{model.material} · {model.time}</span><small>{model.price} ₴ за одиницю</small></div>
                <div className="quantity-control"><button aria-label="Зменшити кількість" onClick={() => setCart((items) => ({ ...items, [model.id]: Math.max(0, (items[model.id] ?? 0) - 1) }))}>−</button><span>{cart[model.id]}</span><button aria-label="Збільшити кількість" onClick={() => addToCart(model.id)}>+</button></div>
                <strong className="order-line-total">{model.price * cart[model.id]} ₴</strong>
              </article>)}</div>
              <aside className="order-summary"><span>Попередній підсумок</span><strong>{cartTotal} ₴</strong><small>Вартість доставки буде розрахована після підтвердження.</small><button type="button" className="checkout-button" onClick={() => window.alert('Форма оформлення замовлення буде доступна після підключення backend.')}>Перейти до оформлення <ChevronRight size={17} /></button></aside>
            </div> : <div className="empty-orders"><span className="empty-bag"><ShoppingBag size={25} /></span><h2>Тут поки порожньо</h2><p>Додай моделі з каталогу, і вони з’являться тут.</p><button className="primary-button" onClick={() => setActiveView('catalog')}>Перейти до каталогу <ChevronRight size={16} /></button></div>}
          </section>}

          {activeView === 'materials' && <section className="secondary-view">
            <div className="eyebrow"><span className="eyebrow-line" /> ДЛЯ КОЖНОЇ ЗАДАЧІ</div>
            <h1>Матеріали</h1>
            <p className="secondary-intro">Підберемо пластик під форму, навантаження та умови використання.</p>
            <div className="material-grid">{materials.map((material) => <article className="material-card" key={material.name}>
              <div className={`material-swatch ${material.name.toLowerCase()}`}><span>{material.name}</span><div>{material.colors.map((color) => <i key={color} style={{ backgroundColor: color }} />)}</div></div>
              <div className="material-card-body"><div className="material-card-title"><h2>{material.name}</h2><strong>{material.price}</strong></div><p>{material.description}</p><div className="material-spec"><span><Check size={14} /> Висока деталізація</span><span><Check size={14} /> 12 кольорів</span></div><button onClick={() => { setSelectedMaterial(material.name); setActiveView('catalog') }} className="material-link">Моделі з {material.name} <ChevronRight size={15} /></button></div>
            </article>)}</div>
          </section>}
        </main>
      </div>
    </div>
  )
}

export default App
