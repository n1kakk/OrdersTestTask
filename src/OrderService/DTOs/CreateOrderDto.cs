using System.ComponentModel.DataAnnotations;

namespace OrderService.DTOs;

public class CreateOrderDto
{
    [Required]
    public string SenderCity { get; set; }

    [Required]
    public string SenderAddress { get; set; }

    [Required]
    public string RecipientCity { get; set; }

    [Required]
    public string RecipientAddress { get; set; }

    [Required]
    [Range(0.5f, 30f)]
    public float Weight { get; set; }

    [Required]
    public DateTime Date { get; set; }
}
