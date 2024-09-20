using System.ComponentModel.DataAnnotations;

namespace OrderService.Entities;

public class Order
{
    public Guid Id { get; set; }

    [Required]
    public string SenderCity { get; set; }

    [Required]
    public string SenderAddress { get; set; }

    [Required]
    public string RecipientCity { get; set; }

    [Required]
    public string RecipientAddress { get; set; }

    [Required]
    public float Weight { get; set; }

    [Required]
    public DateTime Date { get; set; }
}
