using System;
using System.Collections.Generic;

namespace WebApICafe.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public string Name { get; set; } = null!;

    public string? CardNo { get; set; }

    public string? ExpiryDate { get; set; }

    public int? CvvNo { get; set; }

    public string Address { get; set; } = null!;

    public string PaymentMode { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
