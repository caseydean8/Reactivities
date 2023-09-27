using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        // Query fetches, doesn't update
        public class Query : IRequest<Result<ActivityDto>>
        {
            // Set to public so we have access in our handler
            public Guid Id { get; set; }
        }

        // pass Query as the type of request to be handled and Activity as the type of response from the handler. Then...
        // 1. implement interface for IRequestHandler, see 29
        public class Handler : IRequestHandler<Query, Result<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            // 3. Generate constructor from Handler
            // 4. Inject DataContext from Persistence
            // 5. Initialize field from parameter context
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            // 2. Designate Task (implemented from IRequestHandler) as async
            public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // 6. Return Id (see 13) from request
                var activity = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<ActivityDto>.Success(activity);
            }
        }
    }
}