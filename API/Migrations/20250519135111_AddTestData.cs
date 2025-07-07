using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddTestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "ImageUrl", "IsActive", "Name", "Price", "Stock" },
                values: new object[,]
                {
                    { 1, "Telefon açıklaması", "1.jpg", true, "iPhone 15", 60000m, 100 },
                    { 2, "Telefon açıklaması", "2.jpg", true, "iPhone 16", 70000m, 200 },
                    { 3, "Telefon açıklaması", "3.jpg", true, "iPhone 15 Pro", 80000m, 100 },
                    { 4, "Telefon açıklaması", "4.jpg", true, "iPhone 15 Pro Max", 90000m, 500 },
                    { 5, "Telefon açıklaması", "5.jpg", true, "iPhone 16 Pro", 90000m, 600 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
