import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';

const logo = 'https://img.freepik.com/free-vector/leaves-growing-from-ground-green-glyph-style_78370-6720.jpg?t=st=1741713463~exp=1741717063~hmac=4b08f89272b0811f38780422e13b311870a8097d847a154a8eb33f78eb6e524f&w=740';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f4fdf7", // Light green background
  },
  header: {
    backgroundColor: "#2f855a", // Green gradient
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    color: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  customer: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#34495e",
  },
  table: {
    marginTop: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1 solid #ddd",
    paddingVertical: 5,
    backgroundColor: "#ecf0f1",
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 12,
    width: "16.6%",
    textAlign: "center",
    paddingVertical: 5,
    backgroundColor: "#2ecc71",
    color: "#fff",
  },
  tableCell: {
    fontSize: 12,
    width: "16.6%",
    textAlign: "center",
    paddingVertical: 5,
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: "2 solid #27ae60",
    textAlign: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  thankYou: {
    marginTop: 10,
    fontSize: 14,
    color: "#27ae60",
    fontWeight: "bold",
  },
});

// PDF Component
const ReceiptPDF = ({ cartItems }) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity * item.stock,
    0
  );
  const deliveryFee = 50;
  const total = totalAmount + deliveryFee;
  const firstName = localStorage.getItem("loggedInUserfn") || "";
  const lastName = localStorage.getItem("loggedInUserln") || "";
  const customerName = `${firstName} ${lastName}`.trim() || "Unknown Customer";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo & Gradient Background */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text style={styles.title}>KrishiLink Receipt</Text>
            <Text style={styles.subtitle}>Fresh from the Farms</Text>
            <Text style={styles.subtitle}>Date: {new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Customer Section */}
        <View style={styles.section}>
          <Text style={styles.customer}>Customer: {customerName}</Text>
        </View>

        {/* Table Header */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>No.</Text>
            <Text style={styles.tableHeader}>Product Name</Text>
            <Text style={styles.tableHeader}>Quantity</Text>
            <Text style={styles.tableHeader}>Unit Price</Text>
            <Text style={styles.tableHeader}>Stock</Text>
            <Text style={styles.tableHeader}>Total Price</Text>
          </View>

          {/* Table Body */}
          {cartItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.quantity} {item.unit}</Text>
              <Text style={styles.tableCell}>₹{item.price}/{item.unit}</Text>
              <Text style={styles.tableCell}>{item.stock} {item.unit}</Text>
              <Text style={styles.tableCell}>₹{item.price * item.quantity * item.stock}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.deliveryFee}>Delivery Fees: ₹{deliveryFee}</Text>
          <Text style={styles.total}>Total Amount: ₹{total}</Text>
          <Text style={styles.thankYou}>Thank you for supporting local farmers!</Text>
        </View>
      </Page>
    </Document>
  );
};

// Component to Show PDF Preview & Download
const GenerateReceipt = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items dynamically
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  return (
    <div><NavBar></NavBar>
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-full h-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Receipt Preview</h2>

      {/* PDF Viewer for Live Preview */}
      {cartItems.length > 0 ? (
        <>
          <div className="w-full h-96 border-2 border-gray-300 shadow-lg overflow-hidden mb-6">
            <PDFViewer width="100%" height="800px">
              <ReceiptPDF cartItems={cartItems} />
            </PDFViewer>
          </div>

          {/* Download Button */}
          <PDFDownloadLink
            document={<ReceiptPDF cartItems={cartItems} />}
            fileName="KrishiLink_Receipt.pdf"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            {({ loading }) => (loading ? "Generating PDF..." : "📥 Download Receipt")}
          </PDFDownloadLink>
        </>
      ) : (
        <p className="text-gray-500">No items in cart to generate receipt.</p>
      )}
    </div>
    <Footer></Footer>
    </div>
  );
};

export default GenerateReceipt;