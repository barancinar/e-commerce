using API.Entity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : IdentityDbContext<AppUser, AppRole, string>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product { Id=1, Name="iPhone 15", Description="Telefon açıklaması", Price=60000, IsActive=true, ImageUrl="1.jpg", Stock=100 },new Product { Id=2, Name="iPhone 16", Description="Telefon açıklaması", Price=70000, IsActive=true, ImageUrl="2.jpg", Stock=200 },new Product { Id=3, Name="iPhone 15 Pro", Description="Telefon açıklaması", Price=80000, IsActive=true, ImageUrl="3.jpg", Stock=100 },new Product { Id=4, Name="iPhone 15 Pro Max", Description="Telefon açıklaması", Price=90000, IsActive=true, ImageUrl="4.jpg", Stock=500 },new Product { Id=5, Name="iPhone 16 Pro", Description="Telefon açıklaması", Price=90000, IsActive=true, ImageUrl="5.jpg", Stock=600 },

            }
        );
    }
}