using Microsoft.AspNetCore.Mvc;


namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ErrorController : ControllerBase
{

    [HttpGet("not-found")]
    public IActionResult ErrorNotFound()
    {
        return NotFound();  //404 Not Found
    }
    [HttpGet("bad-request")]
    public IActionResult ErrorBadRequest()
    {
        return BadRequest();  //400 Bad Request
    }
    [HttpGet("unauthorized")]
    public IActionResult ErrorUnauthorized()
    {
        return Unauthorized();  //401 Unauthorized
    }
    [HttpGet("server-error")]
    public IActionResult ErrorServerError()
    {
        throw new Exception("server error");  //500 Internal Server Error
    }
    [HttpGet("validation-error")]
    public IActionResult ErrorValidation()
    {
        ModelState.AddModelError("Validation", "This is a validation error");
        ModelState.AddModelError("Validation2", "This is another validation error");
        return ValidationProblem();  //422 Unprocessable Entity
    }

}
