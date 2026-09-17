using Microsoft.AspNetCore.Mvc;
using Back_end.Models;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private static readonly List<Product> Products = new()
        {
            new Product { Id = 1, Name = "Laptop", Description = "High performance laptop", Price = 1200.00m, ImageUrl = "https://via.placeholder.com/150" },
            new Product { Id = 2, Name = "Wireless Mouse", Description = "Ergonomic optical mouse", Price = 25.50m, ImageUrl = "https://via.placeholder.com/150" },
            new Product { Id = 3, Name = "Mechanical Keyboard", Description = "RGB mechanical keyboard", Price = 89.99m, ImageUrl = "https://via.placeholder.com/150" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(Products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProduct(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();
            return Ok(product);
        }
    }
}