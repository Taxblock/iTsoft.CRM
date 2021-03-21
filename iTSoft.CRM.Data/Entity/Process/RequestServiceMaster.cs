﻿using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity.Process
{
    [Table("RequestServiceMaster")]
    public class RequestServiceMaster
    {
        [Key]
        public long RequestServiceId { get; set; }
        public long? RequestId { get; set; }
        public long? ServiceId { get; set; }
        public long? DepartmentId { get; set; }
        public long Quantity { get; set; }
        public long NoOfEmployees { get; set; }
        public decimal? QuoatedPrice { get; set; }
        public decimal? AgreedPrice { get; set; }
        public decimal? TotalQuoatedPrice { get; set; }
        public decimal? TotalAgreedPrice { get; set; }
        public string Remark { get; set; }
        public long SourceId { get; set; }
        public long LeadStatusId { get; set; }
        public long StageId { get; set; }
        public  string TermsAndConditions { get; set; }
        public long AdvisorId { get; set; }
        public DateTime? LastFollowupDate { get; set; }
        public DateTime? NextFollowupDate { get; set; }

    }


    public class RequestServiceDetails : RequestServiceMaster
    {
        public string AdvisorName { get; set; }
        public string ServiceName { get; set; }
        public string DepartmentName { get; set; }
        public string LeadSourceName { get; set; }
        public string LeadStatusName { get; set; }
        public string StageName { get; set; }
        public int Attempts { get; set; }
        public DateTime? CompletedOn { get; set; }
        public DateTime? AssignedOn { get; set; }
        public string RelatedRequestNo { get; set; }
        public long RelatedRequestId { get; set; }


    }
}
