import { render, screen, fireEvent } from "@testing-library/react";
import { useCart } from "@/providers/cart-context";
import ProductDetails from "./product-details";

jest.mock("@/providers/cart-context", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/components/ui/embla-carousel", () => ({
  __esModule: true,
  default: () => <div>Mocked EmblaCarousel</div>,
}));

describe("ProductDetails Component", () => {
  const mockAddItemToCart = jest.fn();

  const mockProduct = {
    id: "1",
    title: "Sample Product",
    price: 100,
    images: [{ url: "/image1.jpg" }, { url: "/image2.jpg" }],
    productSizes: [
      { size: { id: "1", name: "Small" }, stock: 5 },
      { size: { id: "2", name: "Large" }, stock: 0 },
    ],
  };

  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      addItemToCart: mockAddItemToCart,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders product details correctly", () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("R$ 100,00")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Small")).toBeInTheDocument();
    expect(screen.getByText("In Stock: 5")).toBeInTheDocument();
  });

  it("renders all product images", () => {
    render(<ProductDetails product={mockProduct} />);

    mockProduct.images.forEach((image, index) => {
      expect(
        screen.getByAltText(`Product Image ${index + 1}`)
      ).toBeInTheDocument();
    });
  });

  it("updates size and stock when selecting a different size", () => {
    render(<ProductDetails product={mockProduct} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });

    expect(screen.getByDisplayValue("Large")).toBeInTheDocument();
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  it("adds the product to the cart with correct data", () => {
    render(<ProductDetails product={mockProduct} />);

    fireEvent.click(screen.getByText("Add to Cart"));

    expect(mockAddItemToCart).toHaveBeenCalledWith({
      id: mockProduct.id,
      title: mockProduct.title,
      price: mockProduct.price,
      quantity: 1,
      imageUrl: "/image1.jpg",
      size: { id: "1", name: "Small", stock: 5 },
    });
  });

  it('disables "Add to Cart" button when stock is 0', () => {
    render(<ProductDetails product={mockProduct} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });

    expect(screen.getByText("Out of Stock")).toBeInTheDocument();

    const addToCartButton = screen.getByText("Add to Cart");
    expect(addToCartButton).toBeDisabled();
  });
});
