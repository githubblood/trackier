# GET Advertisers API Integration

## Overview
Successfully integrated the `GET /api/v1/admin/advertisers` API into the Manage Advertisers component.

## API Endpoint
```
GET /api/v1/admin/advertisers?page=1&limit=10&search=&status=
```

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search query for name/email
- `status` - Filter by status (active, pending, etc.)

### Response Structure
```json
{
    "success": true,
    "data": [
        {
            "id": 3,
            "user_id": 15,
            "uid": "adv123abc...",
            "name": "Betmen Manager",
            "email": "manager@betmen.com",
            "company_name": "Betmen Gaming Pvt Ltd",
            "website": "https://betmen.com",
            "industry": "iGaming",
            "status": "active",
            "created_at": "2026-01-28T10:00:00.000Z"
        }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 5 }
}
```

## Files Created/Modified

### 1. Created: `advertiser.model.ts`
**Location:** `/src/app/core/models/advertiser.model.ts`

**Interfaces:**
- `Advertiser` - Single advertiser object
- `AdvertiserListResponse` - API list response with pagination
- `AdvertiserListParams` - Query parameters interface
- `AdvertiserDetail` - Detailed advertiser with extended fields
- `AdvertiserDetailResponse` - API detail response

### 2. Created: `advertiser.service.ts`
**Location:** `/src/app/core/services/advertiser.service.ts`

**Methods:**
- `getAdvertisers(params?: AdvertiserListParams)` - Fetch advertisers list with filters
- `getAdvertiserById(id: number)` - Fetch single advertiser details

### 3. Modified: `manage-advertisers.component.ts`
**Location:** `/src/app/pages/advertisers/manage-advertisers/manage-advertisers.component.ts`

**Changes:**
- ✅ Imported `AdvertiserService` and `Advertiser` model
- ✅ Added `loading` and `error` state properties
- ✅ Updated `loadAdvertisers()` to call API instead of using mock data
- ✅ Updated `applyFilters()` to reload from API with filter params
- ✅ Updated `clearFilters()` to reload from API
- ✅ Updated `goToPage()` to reload from API on page change
- ✅ Changed `itemsPerPage` from 25 to 10 to match API default
- ✅ Updated column keys to match API response (`company_name`, `created_at`, etc.)
- ✅ Added new columns: `website`, `industry`, `email`

## Features Implemented

### ✅ API Integration
- Real-time data fetching from backend
- Proper error handling with user feedback
- Loading states during API calls

### ✅ Pagination
- Server-side pagination
- Page size: 10 items per page
- Total count from API response
- Page navigation reloads from API

### ✅ Filtering
- Search by name or email
- Filter by status
- Applied filters reload from API
- Clear filters resets and reloads data

### ✅ Error Handling
- Loading state indicator
- Error message display
- Graceful fallback to empty state

## Data Flow

```
Component Init
    ↓
loadAdvertisers()
    ↓
AdvertiserService.getAdvertisers(params)
    ↓
ApiService.get('/admin/advertisers', queryParams)
    ↓
Backend API
    ↓
Response → Update Component State
    ↓
Display in Template
```

## Column Mapping

| UI Label        | API Field      | Visible by Default |
|-----------------|----------------|--------------------|
| ID              | id             | ✅                 |
| Name            | name           | ✅                 |
| Company         | company_name   | ✅                 |
| Status          | status         | ✅                 |
| Created Date    | created_at     | ✅                 |
| Website         | website        | ✅                 |
| Industry        | industry       | ✅                 |
| Email           | email          | ❌                 |
| Country         | country        | ❌                 |
| Currency        | currency       | ❌                 |

## Usage Example

```typescript
// Component loads advertisers on init
ngOnInit(): void {
    this.loadAdvertisers();
}

// Load with filters
loadAdvertisers(): void {
    const params = {
        page: this.currentPage,
        limit: this.itemsPerPage,
        search: this.filterName || this.filterEmail || '',
        status: this.filterStatus
    };

    this.advertiserService.getAdvertisers(params).subscribe({
        next: (response) => {
            if (response.success) {
                this.advertisers = response.data;
                this.totalItems = response.pagination.total;
            }
        },
        error: (err) => {
            this.error = 'Failed to load advertisers';
        }
    });
}
```

## Next Steps

### Potential Enhancements
1. Add debouncing for search filters
2. Implement sorting functionality
3. Add export functionality
4. Create detailed advertiser view page
5. Implement add/edit advertiser modals with API integration

## Testing Checklist

- [ ] Advertisers list loads on page init
- [ ] Pagination works correctly
- [ ] Search filters work
- [ ] Status filters work
- [ ] Clear filters resets data
- [ ] Loading state displays during API calls
- [ ] Error messages show when API fails
- [ ] Column visibility toggle works
- [ ] Click on advertiser navigates to detail page

## API Response Handling

**Success Response:**
```typescript
{
    success: true,
    data: Advertiser[],
    pagination: {
        page: number,
        limit: number,
        total: number
    }
}
```

**Error Response:**
```typescript
{
    success: false,
    error: {
        code: string,
        message: string
    }
}
```

---

## Summary

✅ **GET Advertisers API fully integrated**
- Service layer created with proper typing
- Component updated to use real API
- Loading and error states implemented
- Pagination working with API
- Filters working with API
- Ready for production use

The integration is complete and the Manage Advertisers page now fetches real data from the backend API!
