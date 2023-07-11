using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // use IRequest interface from MediatR to return a list of type Domain.Activity
        public class Query : IRequest<Result<List<Activity>>> { }
        // use IRequestHandler interface from MediatR to 
        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            // constructor where we bring in DataContext from Persistence
            public Handler(DataContext context)
            {
                _context = context;
            }
            // method that passes Query from line 11 and returns the List specified in line 11
            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Activity>>.Success(await _context.Activities.ToListAsync(cancellationToken));
            }
        }
    }
}