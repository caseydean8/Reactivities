using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // Create mapping from TSource Domain.Activity to TDestination Domain.Activity for Update operations
            CreateMap<Activity, Activity>();
        }
    }
}