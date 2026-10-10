import {
  Routes,
  Route,
  NavLink,
  Navigate,
  Outlet,
} from "react-router-dom";

const orders = [
  {
    id: "ORD-1001",
    customer: "Aarav Patel",
    product: "Wireless Headphones",
    date: "2026-10-08",
    amount: 2499,
    status: "Processing",
  },
  {
    id: "ORD-1002",
    customer: "Priya Shah",
    product: "Smart Watch",
    date: "2026-10-07",
    amount: 4999,
    status: "Shipped",
  },
  {
    id: "ORD-1003",
    customer: "Rohan Mehta",
    product: "Running Shoes",
    date: "2026-10-05",
    amount: 3299,
    status: "Delivered",
  },
  {
    id: "ORD-1004",
    customer: "Diya Desai",
    product: "Laptop Backpack",
    date: "2026-10-04",
    amount: 1499,
    status: "Cancelled",
  },
  {
    id: "ORD-1005",
    customer: "Neha Joshi",
    product: "Bluetooth Speaker",
    date: "2026-10-03",
    amount: 1999,
    status: "Delivered",
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="brand">ShopEase</h2>
      <p className="menu-label">MAIN MENU</p>

      <NavLink to="/" end className="side-link">
        Dashboard
      </NavLink>

      <NavLink to="/orders" className="side-link">
        Orders
      </NavLink>

      <a href="#products" className="side-link">
        Products
      </a>
      <a href="#customers" className="side-link">
        Customers
      </a>
      <a href="#settings" className="side-link">
        Settings
      </a>
    </aside>
  );
}

function Dashboard() {
  return (
    <section className="page">
      <h1>Dashboard</h1>
      <p>Welcome to your order management dashboard.</p>
    </section>
  );
}

// Parent route layout
function OrdersLayout() {
  return (
    <section className="page">
      <div className="breadcrumb">Home / Orders</div>
      <h1>Orders</h1>
      <p className="subtitle">
        Manage and track your customer orders.
      </p>

      <nav className="tabs">
        <NavLink to="current" className="tab">
          Current Orders
        </NavLink>
        <NavLink to="history" className="tab">
          Order History
        </NavLink>
        <NavLink to="cancelled" className="tab">
          Cancelled Orders
        </NavLink>
      </nav>

      {/* Child route content renders here */}
      <Outlet />
    </section>
  );
}

function OrderTable({ items }) {
  if (items.length === 0) {
    return <p className="empty">No orders found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((order) => (
            <tr key={order.id}>
              <td className="order-id">{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.date}</td>
              <td>
                ₹{order.amount.toLocaleString("en-IN")}
              </td>
              <td>
                <span
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CurrentOrders() {
  const items = orders.filter(
    (order) =>
      order.status === "Processing" ||
      order.status === "Shipped"
  );

  return (
    <>
      <h2 className="section-title">Current Orders</h2>
      <p className="section-description">
        Orders currently being processed or shipped.
      </p>
      <OrderTable items={items} />
    </>
  );
}

function OrderHistory() {
  const items = orders.filter(
    (order) =>
      order.status === "Delivered" ||
      order.status === "Cancelled"
  );

  return (
    <>
      <h2 className="section-title">Order History</h2>
      <p className="section-description">
        Review your previous and completed orders.
      </p>
      <OrderTable items={items} />
    </>
  );
}

function CancelledOrders() {
  const items = orders.filter(
    (order) => order.status === "Cancelled"
  );

  return (
    <>
      <h2 className="section-title">Cancelled Orders</h2>
      <p className="section-description">
        Orders that have been cancelled.
      </p>
      <OrderTable items={items} />
    </>
  );
}

export default function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Parent route */}
          <Route path="/orders" element={<OrdersLayout />}>
            {/* Default nested route */}
            <Route
              index
              element={<Navigate to="current" replace />}
            />

            {/* Child routes */}
            <Route
              path="current"
              element={<CurrentOrders />}
            />
            <Route
              path="history"
              element={<OrderHistory />}
            />
            <Route
              path="cancelled"
              element={<CancelledOrders />}
            />
          </Route>

          <Route
            path="*"
            element={<h1>404 - Page Not Found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
}