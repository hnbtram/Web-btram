// Sample data
let bookings = [];
let payments = [];
let savedServices = [];
let currentUser = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    dob: '01/01/1990',
    gender: 'Nam',
    memberSince: '2024'
};

// Initialize sample data
function initSampleData() {
    if (localStorage.getItem('bookings')) {
        bookings = JSON.parse(localStorage.getItem('bookings'));
    } else {
        bookings = [
            {
                id: 'BK214',
                service: 'Sửa thiết bị gia dụng',
                price: 250000,
                totalAmount: 260000,
                date: '2026-03-12',
                time: '08:00',
                address: 'Hà Nội',
                phone: '0123456789',
                customerName: 'Nguyễn Văn A',
                status: 'pending',
                paymentStatus: 'unpaid',
                paymentMethod: 'cash',
                notes: '',
                staffCount: 1,
                createdAt: new Date().toISOString()
            },
            {
                id: 'BK002',
                service: 'Sửa máy lạnh',
                price: 300000,
                totalAmount: 310000,
                date: '2024-03-20',
                time: '14:00',
                address: '456 Đường XYZ, Quận 2, TP.HCM',
                phone: '0123456789',
                customerName: 'Nguyễn Văn A',
                status: 'confirmed',
                paymentStatus: 'paid',
                paymentMethod: 'card',
                notes: 'Máy lạnh Panasonic 1.5HP',
                staffCount: 1,
                createdAt: new Date().toISOString()
            },
            {
                id: 'BK003',
                service: 'Giặt sofa',
                price: 350000,
                totalAmount: 360000,
                date: '2024-03-10',
                time: '09:00',
                address: '789 Đường DEF, Quận 3, TP.HCM',
                phone: '0123456789',
                customerName: 'Nguyễn Văn A',
                status: 'completed',
                paymentStatus: 'paid',
                paymentMethod: 'momo',
                notes: 'Sofa phòng khách 3 chỗ',
                staffCount: 1,
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    if (localStorage.getItem('payments')) {
        payments = JSON.parse(localStorage.getItem('payments'));
    } else {
        payments = [
            {
                id: 'PAY001',
                bookingId: 'BK002',
                amount: 310000,
                method: 'card',
                status: 'paid',
                date: '2024-03-15',
                service: 'Sửa máy lạnh',
                customerName: 'Nguyễn Văn A'
            },
            {
                id: 'PAY002',
                bookingId: 'BK003',
                amount: 360000,
                method: 'momo',
                status: 'paid',
                date: '2024-03-10',
                service: 'Giặt sofa',
                customerName: 'Nguyễn Văn A'
            }
        ];
        localStorage.setItem('payments', JSON.stringify(payments));
    }

    if (localStorage.getItem('savedServices')) {
        savedServices = JSON.parse(localStorage.getItem('savedServices'));
    } else {
        savedServices = [
            {
                id: 'SV001',
                name: 'Dọn dẹp cuối tuần',
                description: 'Dọn dẹp toàn bộ nhà cửa vào cuối tuần',
                price: 300000,
                unit: 'giờ',
                notes: 'Ưu tiên sáng chủ nhật',
                createdAt: new Date().toISOString()
            },
            {
                id: 'SV002',
                name: 'Bảo trì máy lạnh',
                description: 'Vệ sinh và bảo dưỡng máy lạnh định kỳ',
                price: 250000,
                unit: 'lần',
                notes: '2 máy lạnh',
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem('savedServices', JSON.stringify(savedServices));
    }

    // Load activity timeline
    loadActivityTimeline();
}

// Load activity timeline
function loadActivityTimeline() {
    const timeline = document.getElementById('activity-timeline');
    if (!timeline) return;
    
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn A';
    const userBookings = bookings.filter(b => b.customerName === userName).slice(0, 3);
    
    const recentActivities = userBookings.map(booking => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <span class="timeline-date">${formatDate(booking.date)}</span>
            <div class="timeline-content">
                <h4>${booking.service}</h4>
                <p>Đơn hàng #${booking.id} - ${getStatusText(booking.status)}</p>
            </div>
        </div>
    `).join('');

    timeline.innerHTML = recentActivities || '<p style="text-align: center; padding: 1rem;">Chưa có hoạt động nào</p>';
}

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// Check password strength
function checkPasswordStrength(password) {
    const bar = document.getElementById('password-strength-bar');
    if (!bar) return;
    
    bar.className = 'password-strength-bar';
    
    if (password.length === 0) {
        bar.style.width = '0';
        return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    if (strength <= 2) {
        bar.classList.add('weak');
    } else if (strength <= 4) {
        bar.classList.add('medium');
    } else {
        bar.classList.add('strong');
    }
}

// Switch auth tabs
function switchAuthTab(tab) {
    if (tab === 'login') {
        closeModal('register-modal');
        showLoginModal();
    } else {
        closeModal('login-modal');
        showRegisterModal();
    }
}

// Show profile
function showProfile() {
    showSection('profile');
    updateProfileStats();
    loadProfileBookings();
    loadProfilePayments();
    loadProfileReviews();
    loadSavedServices();
}

// Show saved services
function showSavedServices() {
    showSection('saved');
    loadSavedServicesList();
}

// Update profile stats
function updateProfileStats() {
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn A';
    const userBookings = bookings.filter(b => b.customerName === userName);
    
    document.getElementById('total-bookings').textContent = userBookings.length;
    document.getElementById('completed-bookings').textContent = userBookings.filter(b => b.status === 'completed').length;
    document.getElementById('avg-rating').textContent = '4.9';
}

// Load profile bookings
function loadProfileBookings(filter = 'all') {
    const bookingsList = document.getElementById('profile-bookings-list');
    if (!bookingsList) return;
    
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn A';
    const userBookings = bookings.filter(b => b.customerName === userName);
    
    let filteredBookings = userBookings;
    if (filter !== 'all') {
        filteredBookings = userBookings.filter(b => b.status === filter);
    }

    filteredBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (filteredBookings.length === 0) {
        bookingsList.innerHTML = '<p style="text-align: center; padding: 2rem;">Không có đơn đặt dịch vụ nào.</p>';
        return;
    }

    bookingsList.innerHTML = filteredBookings.map(booking => `
        <div class="booking-item ${booking.status}">
            <div class="booking-header">
                <h4><i>🔧</i> ${booking.service}</h4>
                <span class="booking-id">Mã đơn: ${booking.id}</span>
            </div>
            <div class="booking-body">
                <div>
                    <p><i>📅</i> <strong>Ngày giờ:</strong> ${formatDate(booking.date)} - ${booking.time}</p>
                    <p><i>📍</i> <strong>Địa chỉ:</strong> ${booking.address}</p>
                </div>
                <div>
                    <p><i>💰</i> <strong>Tổng tiền:</strong> ${formatPrice(booking.totalAmount)}</p>
                    <p><i>💳</i> <strong>Thanh toán:</strong> <span class="status-badge ${booking.paymentStatus === 'paid' ? 'status-completed' : 'status-pending'}">${booking.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</span></p>
                </div>
            </div>
            <div class="booking-footer">
                <button class="btn-book" onclick="viewBookingDetail('${booking.id}')"><i>👁️</i> Xem chi tiết</button>
                ${booking.paymentStatus === 'unpaid' ? 
                    `<button class="btn-pay" onclick="showPaymentModal('${booking.id}')"><i>💳</i> Thanh toán ngay</button>` : ''}
                ${booking.status === 'pending' ? 
                    `<button class="btn-cancel" onclick="cancelBooking('${booking.id}')"><i>❌</i> Hủy đơn</button>` : ''}
            </div>
        </div>
    `).join('');
}

// Load saved services for profile
function loadSavedServices() {
    const savedList = document.getElementById('saved-bookings-list');
    if (!savedList) return;
    
    if (savedServices.length === 0) {
        savedList.innerHTML = '<p style="text-align: center; padding: 2rem;">Chưa có đơn dịch vụ nào được lưu.</p>';
        return;
    }

    savedList.innerHTML = savedServices.map(service => `
        <div class="booking-item">
            <div class="booking-header">
                <h4>${service.name}</h4>
                <span class="status-badge status-completed">Đã lưu</span>
            </div>
            <div class="booking-body">
                <div>
                    <p><strong>Mã:</strong> ${service.id}</p>
                    <p><strong>Mô tả:</strong> ${service.description || 'Không có'}</p>
                </div>
                <div>
                    <p><strong>Giá:</strong> ${formatPrice(service.price)} <small>/${service.unit}</small></p>
                    <p><strong>Ghi chú:</strong> ${service.notes || 'Không có'}</p>
                </div>
            </div>
            <div class="booking-footer">
                <button class="btn-book" onclick="useSavedService('${service.id}')">Sử dụng</button>
                <button class="btn-cancel" onclick="deleteSavedService('${service.id}')">Xóa</button>
            </div>
        </div>
    `).join('');
}

// Load saved services list
function loadSavedServicesList() {
    const savedList = document.getElementById('saved-services-list');
    if (!savedList) return;
    
    if (savedServices.length === 0) {
        savedList.innerHTML = '<p style="text-align: center; padding: 2rem;">Chưa có đơn dịch vụ nào được lưu.</p>';
        return;
    }

    savedList.innerHTML = savedServices.map(service => `
        <div class="booking-item">
            <div class="booking-header">
                <h4>${service.name}</h4>
                <span class="status-badge status-completed">Đã lưu</span>
            </div>
            <div class="booking-body">
                <div>
                    <p><strong>Mã:</strong> ${service.id}</p>
                    <p><strong>Mô tả:</strong> ${service.description || 'Không có'}</p>
                </div>
                <div>
                    <p><strong>Giá:</strong> ${formatPrice(service.price)} <small>/${service.unit}</small></p>
                    <p><strong>Ghi chú:</strong> ${service.notes || 'Không có'}</p>
                </div>
            </div>
            <div class="booking-footer">
                <button class="btn-book" onclick="useSavedService('${service.id}')">Đặt ngay</button>
                <button class="btn-cancel" onclick="deleteSavedService('${service.id}')">Xóa</button>
            </div>
        </div>
    `).join('');
}

// Use saved service
function useSavedService(serviceId) {
    const service = savedServices.find(s => s.id === serviceId);
    if (service) {
        showBookingModal(service.name, service.price);
        document.getElementById('booking-notes').value = service.notes || '';
    }
}

// Delete saved service
function deleteSavedService(serviceId) {
    if (confirm('Bạn có chắc chắn muốn xóa đơn dịch vụ đã lưu này?')) {
        savedServices = savedServices.filter(s => s.id !== serviceId);
        localStorage.setItem('savedServices', JSON.stringify(savedServices));
        loadSavedServices();
        loadSavedServicesList();
        alert('Đã xóa đơn dịch vụ!');
    }
}

// Load profile payments
function loadProfilePayments(filter = 'all') {
    const paymentsList = document.getElementById('profile-payments-list');
    if (!paymentsList) return;
    
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn A';
    const userPayments = payments.filter(p => p.customerName === userName);
    
    let filteredPayments = userPayments;
    if (filter !== 'all') {
        filteredPayments = userPayments.filter(p => p.status === filter);
    }

    filteredPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredPayments.length === 0) {
        paymentsList.innerHTML = '<p style="text-align: center; padding: 2rem;">Không có lịch sử thanh toán.</p>';
        return;
    }

    paymentsList.innerHTML = filteredPayments.map(payment => `
        <div class="booking-item">
            <div class="booking-header">
                <h4>${payment.service}</h4>
                <span class="status-badge status-completed">Đã thanh toán</span>
            </div>
            <div class="booking-body">
                <div>
                    <p><strong>Mã giao dịch:</strong> ${payment.id}</p>
                    <p><strong>Mã đơn:</strong> ${payment.bookingId}</p>
                    <p><strong>Ngày:</strong> ${formatDate(payment.date)}</p>
                </div>
                <div>
                    <p><strong>Số tiền:</strong> ${formatPrice(payment.amount)}</p>
                    <p><strong>Phương thức:</strong> ${getPaymentMethodText(payment.method)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Load profile reviews
function loadProfileReviews() {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    // Sample reviews
    const reviews = [
        {
            service: 'Dọn dẹp nhà cửa',
            staff: 'Trần Thị Bình',
            rating: 5,
            comment: 'Nhân viên làm việc rất tốt, sạch sẽ',
            date: '2024-03-10'
        },
        {
            service: 'Sửa máy lạnh',
            staff: 'Lê Văn Cường',
            rating: 4,
            comment: 'Sửa nhanh, giá hợp lý',
            date: '2024-03-05'
        }
    ];

    reviewsList.innerHTML = reviews.map(review => `
        <div class="booking-item">
            <div class="booking-header">
                <h4>${review.service}</h4>
                <div class="staff-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)} (${review.rating}.0)</div>
            </div>
            <div class="booking-body">
                <div>
                    <p><strong>Nhân viên:</strong> ${review.staff}</p>
                    <p><strong>Ngày:</strong> ${formatDate(review.date)}</p>
                </div>
                <div>
                    <p><strong>Nhận xét:</strong> ${review.comment}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter profile bookings
function filterProfileBookings(filter) {
    document.querySelectorAll('#profile-bookings ~ .filter-tabs .filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    loadProfileBookings(filter);
}

// Filter profile payments
function filterProfilePayments(filter) {
    document.querySelectorAll('#profile-payments ~ .filter-tabs .filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    loadProfilePayments(filter);
}

// Show profile section
function showProfileSection(section) {
    document.querySelectorAll('.profile-section').forEach(s => s.classList.remove('active'));
    document.getElementById('profile-' + section).classList.add('active');
    
    document.querySelectorAll('.profile-menu a').forEach(a => a.classList.remove('active'));
    event.target.closest('a').classList.add('active');

    if (section === 'bookings') {
        loadProfileBookings();
    } else if (section === 'payments') {
        loadProfilePayments();
    } else if (section === 'saved') {
        loadSavedServices();
    }
}

// Edit profile
function editProfile() {
    alert('Chức năng chỉnh sửa hồ sơ đang được phát triển!');
}

// Upload avatar
function uploadAvatar(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-avatar').innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Save settings
function saveSettings(event) {
    event.preventDefault();
    alert('Đã lưu thay đổi thành công!');
}

// Show/Hide Sections
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionName + '-section').style.display = 'block';
    
    // Load dữ liệu khi vào trang dịch vụ
    if (sectionName === 'services') {
        loadServices();
        } else if (sectionName === 'staff') { // THÊM DÒNG NÀY
        loadPublicStaff(); // THÊM DÒNG NÀY
    }
    
    return `
    <div class="service-card" onclick="viewServiceDetail(${service.id})">
        ...
        <button class="btn-book" onclick="event.stopPropagation(); showBookingModal('${service.name}', ${service.price})" style="flex: 1;">
            Đặt ngay
        </button>
        <button class="btn-book" onclick="event.stopPropagation(); viewServiceDetail(${service.id})" style="flex: 1; background: #6c757d;">
            Chi tiết
        </button>
    </div>
`;
}

// Show My Bookings
function showMyBookings() {
    showSection('mybookings');
    loadUserBookings();
}

// Show My Payments
function showMyPayments() {
    showSection('mypayments');
    loadUserPayments();
}

// Load user bookings
function loadUserBookings(filter = 'all') {
    const bookingsList = document.getElementById('bookings-list');
    if (!bookingsList) return;
    
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn A';
    const userBookings = bookings.filter(b => b.customerName === userName);
    
    let filteredBookings = userBookings;
    if (filter !== 'all') {
        filteredBookings = userBookings.filter(b => b.status === filter);
    }

    filteredBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (filteredBookings.length === 0) {
        bookingsList.innerHTML = '<p style="text-align: center; padding: 2rem;">Không có đơn đặt dịch vụ nào.</p>';
        return;
    }

    bookingsList.innerHTML = filteredBookings.map(booking => `
        <div class="booking-item ${booking.status}">
            <div class="booking-header">
                <h4><i>${booking.service.includes('Sửa') ? '🔧' : '🧹'}</i> ${booking.service}</h4>
                <span class="booking-id">Mã đơn: ${booking.id}</span>
            </div>
            <div class="booking-body">
                <div>
                    <p><i>📅</i> <strong>Ngày giờ:</strong> ${formatDate(booking.date)} - ${booking.time}</p>
                    <p><i>📍</i> <strong>Địa chỉ:</strong> ${booking.address}</p>
                </div>
                <div>
                    <p><i>💰</i> <strong>Tổng tiền:</strong> ${formatPrice(booking.totalAmount)}</p>
                    <p><i>💳</i> <strong>Thanh toán:</strong> <span class="status-badge ${booking.paymentStatus === 'paid' ? 'status-completed' : 'status-pending'}">${booking.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</span></p>
                </div>
            </div>
            <div class="booking-footer">
                <button class="btn-book" onclick="viewBookingDetail('${booking.id}')"><i>👁️</i> Xem chi tiết</button>
                ${booking.paymentStatus === 'unpaid' ? 
                    `<button class="btn-pay" onclick="showPaymentModal('${booking.id}')"><i>💳</i> Thanh toán ngay</button>` : ''}
                ${booking.status === 'pending' ? 
                    `<button class="btn-cancel" onclick="cancelBooking('${booking.id}')"><i>❌</i> Hủy đơn</button>` : ''}
            </div>
        </div>
    `).join('');
}

// Load user payments
function loadUserPayments(filter = 'all') {
    const paymentsList = document.getElementById('payments-list');
    if (!paymentsList) return;
    
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn A';
    const userPayments = payments.filter(p => p.customerName === userName);
    
    let filteredPayments = userPayments;
    if (filter !== 'all') {
        filteredPayments = userPayments.filter(p => p.status === filter);
    }

    filteredPayments.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredPayments.length === 0) {
        paymentsList.innerHTML = '<p style="text-align: center; padding: 2rem;">Không có lịch sử thanh toán.</p>';
        return;
    }

    paymentsList.innerHTML = filteredPayments.map(payment => `
        <div class="booking-item">
            <div class="booking-header">
                <h4>${payment.service}</h4>
                <span class="status-badge status-completed">Đã thanh toán</span>
            </div>
            <div class="booking-body">
                <div>
                    <p><strong>Mã giao dịch:</strong> ${payment.id}</p>
                    <p><strong>Mã đơn:</strong> ${payment.bookingId}</p>
                    <p><strong>Ngày:</strong> ${formatDate(payment.date)}</p>
                </div>
                <div>
                    <p><strong>Số tiền:</strong> ${formatPrice(payment.amount)}</p>
                    <p><strong>Phương thức:</strong> ${getPaymentMethodText(payment.method)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter bookings
function filterBookings(filter) {
    document.querySelectorAll('#mybookings-section .filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    loadUserBookings(filter);
}

// Filter payments
function filterPayments(filter) {
    document.querySelectorAll('#mypayments-section .filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    loadUserPayments(filter);
}

// View booking detail
function viewBookingDetail(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const detailContent = document.getElementById('booking-detail-content');
    if (!detailContent) return;

    detailContent.innerHTML = `
        <div class="booking-info">
            <h3 style="margin-bottom: 1rem; color: #667eea;">Thông tin đơn hàng #${booking.id}</h3>
            
            <div style="background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%); padding: 1.5rem; border-radius: 10px;">
                <div class="info-row" style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                    <span style="width: 120px; font-weight: 600; color: #666;">Dịch vụ:</span>
                    <span style="flex: 1; color: #333; font-weight: 600;">${booking.service}</span>
                </div>
                <div class="info-row" style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                    <span style="width: 120px; font-weight: 600; color: #666;">Trạng thái:</span>
                    <span style="flex: 1; color: #333;">
                        <span class="status-badge status-${booking.status}" style="padding: 6px 12px; border-radius: 20px; background: ${booking.status === 'pending' ? '#fff3cd' : booking.status === 'confirmed' ? '#d4edda' : booking.status === 'completed' ? '#cce5ff' : '#f8d7da'}; color: ${booking.status === 'pending' ? '#856404' : booking.status === 'confirmed' ? '#155724' : booking.status === 'completed' ? '#004085' : '#721c24'};">
                            ${getStatusText(booking.status)}
                        </span>
                    </span>
                </div>
                <div class="info-row" style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                    <span style="width: 120px; font-weight: 600; color: #666;">Thanh toán:</span>
                    <span style="flex: 1; color: #333;">
                        <span class="status-badge" style="padding: 6px 12px; border-radius: 20px; background: ${booking.paymentStatus === 'paid' ? '#d4edda' : '#fff3cd'}; color: ${booking.paymentStatus === 'paid' ? '#155724' : '#856404'};">
                            ${booking.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </span>
                    </span>
                </div>
                <div class="info-row" style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                    <span style="width: 120px; font-weight: 600; color: #666;">Ngày giờ:</span>
                    <span style="flex: 1; color: #333;">${formatDate(booking.date)} - ${booking.time}</span>
                </div>
                <div class="info-row" style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                    <span style="width: 120px; font-weight: 600; color: #666;">Địa chỉ:</span>
                    <span style="flex: 1; color: #333;">${booking.address}</span>
                </div>
                ${booking.notes ? `
                <div class="info-row" style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                    <span style="width: 120px; font-weight: 600; color: #666;">Ghi chú:</span>
                    <span style="flex: 1; color: #333;">${booking.notes}</span>
                </div>
                ` : ''}
            </div>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
            <button class="btn-book" onclick="closeModal('booking-detail-modal')" style="flex: 1;">Đóng</button>
        </div>
    `;

    document.getElementById('booking-detail-modal').classList.add('active');
}

// Show save booking modal
function showSaveBookingModal() {
    document.getElementById('save-booking-modal').classList.add('active');
}

// Handle save booking
function handleSaveBooking(event) {
    event.preventDefault();
    
    const name = document.getElementById('save-service-name').value;
    const description = document.getElementById('save-service-desc').value;
    const price = parseInt(document.getElementById('save-service-price').value);
    const unit = document.getElementById('save-service-unit').value;
    const notes = document.getElementById('save-service-notes').value;

    const newSavedService = {
        id: 'SV' + Math.floor(Math.random() * 1000),
        name: name,
        description: description,
        price: price,
        unit: unit,
        notes: notes,
        createdAt: new Date().toISOString()
    };

    savedServices.push(newSavedService);
    localStorage.setItem('savedServices', JSON.stringify(savedServices));

    alert('Đã lưu đơn dịch vụ thành công!');
    closeModal('save-booking-modal');
    
    // Reset form
    document.getElementById('save-service-name').value = '';
    document.getElementById('save-service-desc').value = '';
    document.getElementById('save-service-price').value = '';
    document.getElementById('save-service-notes').value = '';

    // Refresh displays
    loadSavedServices();
    loadSavedServicesList();
}

// Show payment modal - DÙNG STYLE TRỰC TIẾP
function showPaymentModal(bookingId) {
    console.log('Mở thanh toán:', bookingId);
    
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }

    // Cập nhật thông tin
    const paymentInfo = document.getElementById('payment-booking-info');
    if (paymentInfo) {
        paymentInfo.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding-bottom:10px; border-bottom:1px dashed #667eea;">
                <span>Mã đơn:</span>
                <span style="color:#667eea; font-weight:bold;">#${booking.id}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Dịch vụ:</span>
                <span>${booking.service}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>Ngày giờ:</span>
                <span>${formatDate(booking.date)} ${booking.time}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-top:10px; padding-top:10px; border-top:2px solid #667eea;">
                <span style="font-size:1.1rem; font-weight:bold;">Tổng tiền:</span>
                <span style="font-size:1.5rem; font-weight:bold; color:#10b981;">${formatPrice(booking.totalAmount)}</span>
            </div>
        `;
    }

    // Cập nhật nội dung chuyển khoản
    const bankContent = document.getElementById('bank-transfer-content');
    if (bankContent) {
        bankContent.textContent = `TT DON HANG ${booking.id}`;
    }

    document.getElementById('payment-booking-id').value = bookingId;
    
    // Reset các phương thức
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.style.border = '2px solid #ddd';
    });
    const firstCard = document.querySelector('.payment-method-card');
    if (firstCard) {
        firstCard.style.border = '2px solid #667eea';
    }
    
    // Ẩn tất cả details
    document.getElementById('card-details').style.display = 'none';
    document.getElementById('bank-details').style.display = 'none';
    document.getElementById('momo-details').style.display = 'none';
    
    // HIỂN THỊ MODAL - CÁCH ĐƠN GIẢN NHẤT
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'block'; // dùng block thay vì flex
    
    console.log('Đã mở modal');
}

// Select payment method - SỬA LỖI
function selectPaymentMethod(method, element) {
    // Reset tất cả các card
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.style.border = '2px solid #ddd';
        card.classList.remove('selected');
    });
    
    // Highlight card được chọn
    element.style.border = '2px solid #667eea';
    element.classList.add('selected');

    // Ẩn tất cả details
    document.getElementById('card-details').style.display = 'none';
    document.getElementById('bank-details').style.display = 'none';
    document.getElementById('momo-details').style.display = 'none';

    // Hiện details tương ứng
    if (method === 'card') {
        document.getElementById('card-details').style.display = 'block';
    } else if (method === 'bank') {
        document.getElementById('bank-details').style.display = 'block';
    } else if (method === 'momo') {
        document.getElementById('momo-details').style.display = 'block';
    }
}

// Process payment
function processPayment() {
    const selectedMethod = document.querySelector('.payment-method.selected');
    if (!selectedMethod) {
        alert('Vui lòng chọn phương thức thanh toán!');
        return;
    }

    const methodText = selectedMethod.textContent.trim();
    let method = 'cash';
    
    if (methodText.includes('Thẻ')) method = 'card';
    else if (methodText.includes('Chuyển khoản')) method = 'bank';
    else if (methodText.includes('MoMo')) method = 'momo';

    // Validate payment details for card
    if (method === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        
        if (!cardNumber || !cardExpiry || !cardCvv) {
            alert('Vui lòng nhập đầy đủ thông tin thẻ!');
            return;
        }
        
        // Basic validation
        if (cardNumber.replace(/\s/g, '').length < 16) {
            alert('Số thẻ không hợp lệ!');
            return;
        }
        if (cardCvv.length < 3) {
            alert('Mã CVV không hợp lệ!');
            return;
        }
    }

    const bookingId = document.getElementById('payment-booking-id').value;
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        // Cập nhật trạng thái thanh toán
        booking.paymentStatus = 'paid';
        booking.paymentMethod = method;
        
        // Tạo bản ghi thanh toán mới
        const payment = {
            id: 'PAY' + Math.floor(Math.random() * 10000),
            bookingId: bookingId,
            amount: booking.totalAmount,
            method: method,
            status: 'paid',
            date: new Date().toISOString().split('T')[0],
            service: booking.service,
            customerName: booking.customerName || localStorage.getItem('userName') || 'Nguyễn Văn A'
        };
        
        payments.push(payment);
        
        // Lưu vào localStorage
        localStorage.setItem('bookings', JSON.stringify(bookings));
        localStorage.setItem('payments', JSON.stringify(payments));
        
        // Hiển thị thông báo thành công
        const methodNames = {
            'cash': 'tiền mặt',
            'card': 'thẻ tín dụng',
            'bank': 'chuyển khoản',
            'momo': 'ví MoMo'
        };
        
        alert(`✅ Thanh toán thành công qua ${methodNames[method]}!\n💰 Số tiền: ${formatPrice(booking.totalAmount)}\n📋 Mã đơn: ${booking.id}`);
        
        // Đóng modal
        closeModal('payment-modal');
        
        // Reset form
        document.getElementById('card-number').value = '';
        document.getElementById('card-expiry').value = '';
        document.getElementById('card-cvv').value = '';
        
        // Refresh tất cả các section
        refreshAllSections();
    } else {
        alert('Không tìm thấy đơn hàng!');
    }
}



// Cancel booking
function cancelBooking(bookingId) {
    if (confirm('Bạn có chắc chắn muốn hủy đơn dịch vụ này?')) {
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'cancelled';
            localStorage.setItem('bookings', JSON.stringify(bookings));
            
            alert('Đã hủy đơn dịch vụ!');
            closeModal('booking-detail-modal');
            
            refreshAllSections();
        }
    }
}

// Save booking draft
function saveBookingDraft() {
    alert('Chức năng lưu nháp đang được phát triển!');
}

// Modal Functions
function showLoginModal() {
    document.getElementById('login-modal').classList.add('active');
}

function showRegisterModal() {
    closeModal('login-modal');
    document.getElementById('register-modal').classList.add('active');
}

function showBookingModal(serviceName, price) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        alert('Vui lòng đăng nhập để đặt dịch vụ!');
        showLoginModal();
        return;
    }

    document.getElementById('booking-service').textContent = serviceName;
    document.getElementById('booking-service-hidden').value = serviceName;
    document.getElementById('booking-price-hidden').value = price;
    document.getElementById('service-price').textContent = formatPrice(price);
    
    const totalPrice = price + 10000;
    document.getElementById('total-price').textContent = formatPrice(totalPrice);
    document.getElementById('extra-staff-fee').textContent = '0 ₫';
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').min = today;
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('booking-date').value = tomorrow.toISOString().split('T')[0];
    
    // Set default time
    document.getElementById('booking-time').value = '08:00';
    
    document.getElementById('booking-modal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', username);
        
        closeModal('login-modal');
        
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
        document.getElementById('displayName').innerHTML = `<i>👤</i> ${username}`;
        
        // Update profile name
        document.getElementById('profile-name').textContent = username;
        document.getElementById('info-fullname').textContent = username;
        
        alert('Đăng nhập thành công!');
    } else {
        alert('Vui lòng nhập đầy đủ thông tin!');
    }
}

// Handle Register
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    if (password.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự!');
        return;
    }

    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    closeModal('register-modal');
    showLoginModal();
}

// Handle Booking - SỬA ĐỂ HIỆN THANH TOÁN NGAY
function handleBooking(event) {
    event.preventDefault();
    
    // Lấy thông tin từ form
    const service = document.getElementById('booking-service').textContent;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const address = document.getElementById('booking-address').value;
    const phone = document.getElementById('booking-phone').value;
    const notes = document.getElementById('booking-notes').value;
    const staffCount = parseInt(document.getElementById('booking-staff').value);
    const price = parseInt(document.getElementById('booking-price-hidden').value);
    
    // Kiểm tra thông tin
    if (!address || !phone) {
        alert('Vui lòng nhập đầy đủ địa chỉ và số điện thoại!');
        return;
    }
    
    // Tính tổng tiền
    const extraFee = (staffCount - 1) * 50000;
    const totalAmount = price + 10000 + extraFee;

    // Thông tin người dùng
    const userName = localStorage.getItem('userName') || 'Nguyễn Văn A';

    // Tạo đơn mới
    const newBooking = {
        id: 'BK' + Math.floor(Math.random() * 10000),
        service: service,
        price: price,
        totalAmount: totalAmount,
        date: date,
        time: time,
        address: address,
        phone: phone,
        customerName: userName,
        status: 'pending',
        paymentStatus: 'unpaid',
        paymentMethod: 'cash',
        notes: notes,
        staffCount: staffCount,
        createdAt: new Date().toISOString()
    };

    // Lưu vào localStorage
    let currentBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    currentBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(currentBookings));
    bookings = currentBookings;

    // Cập nhật số lượt đặt
    updateServiceBookings(service);

    // Thông báo thành công
    alert(`✅ Đặt dịch vụ thành công!\nMã đơn: ${newBooking.id}`);

    // Đóng modal đặt dịch vụ
    closeModal('booking-modal');
    
    // Reset form
    document.getElementById('booking-address').value = '';
    document.getElementById('booking-phone').value = '';
    document.getElementById('booking-notes').value = '';
    document.getElementById('booking-staff').value = '1';

    // HIỂN THỊ THANH TOÁN NGAY LẬP TỨC
    showPaymentModal(newBooking.id);
    
    refreshAllSections();
}

// Hàm refresh tất cả các section
function refreshAllSections() {
    // Refresh My Bookings
    if (document.getElementById('mybookings-section').style.display !== 'none') {
        loadUserBookings();
    }
    
    // Refresh My Payments
    if (document.getElementById('mypayments-section').style.display !== 'none') {
        loadUserPayments();
    }
    
    // Refresh Profile
    if (document.getElementById('profile-section').style.display !== 'none') {
        loadProfileBookings();
        loadProfilePayments();
        updateProfileStats();
        loadActivityTimeline();
    }
}

// Update total price when staff count changes
document.addEventListener('DOMContentLoaded', function() {
    const staffSelect = document.getElementById('booking-staff');
    if (staffSelect) {
        staffSelect.addEventListener('change', function() {
            const price = parseInt(document.getElementById('booking-price-hidden').value);
            const staffCount = parseInt(this.value);
            
            const extraFee = (staffCount - 1) * 50000;
            document.getElementById('extra-staff-fee').textContent = formatPrice(extraFee);
            
            const totalPrice = price + 10000 + extraFee;
            document.getElementById('total-price').textContent = formatPrice(totalPrice);
        });
    }
});


// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('user-section').style.display = 'none';
    
    showSection('home');
    alert('Đã đăng xuất!');
}

// Search Services
function searchServices() {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        alert(`Tìm kiếm dịch vụ: ${searchTerm}`);
    } else {
        alert('Vui lòng nhập từ khóa tìm kiếm!');
    }
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Chờ xác nhận',
        'confirmed': 'Đã xác nhận',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
}

function getPaymentMethodText(method) {
    const methodMap = {
        'cash': 'Tiền mặt',
        'card': 'Thẻ tín dụng',
        'bank': 'Chuyển khoản',
        'momo': 'Ví điện tử'
    };
    return methodMap[method] || method;
}

// Show forgot password modal
function showForgotPasswordModal() {
    closeModal('login-modal');
    closeModal('register-modal');
    document.getElementById('forgot-password-modal').classList.add('active');
}

// Handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    if (!email) {
        alert('Vui lòng nhập email!');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ!');
        return;
    }
    
    // Kiểm tra email có tồn tại trong hệ thống không
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.some(user => user.email === email);
    
    if (!userExists) {
        // Vẫn hiển thị thành công để bảo mật (không tiết lộ email có tồn tại hay không)
        showSuccessMessage('Nếu email tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.');
        return;
    }
    
    // Tạo token reset password (trong thực tế sẽ gửi email)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    // Lưu token tạm thời (trong thực tế sẽ lưu trong database với thời hạn)
    const resetRequests = JSON.parse(localStorage.getItem('resetRequests') || '[]');
    resetRequests.push({
        email: email,
        token: resetToken,
        expires: new Date().getTime() + 3600000 // 1 giờ
    });
    localStorage.setItem('resetRequests', JSON.stringify(resetRequests));
    
    // Log token để test (trong thực tế sẽ gửi email)
    console.log('Reset password token:', resetToken);
    
    showSuccessMessage('Hướng dẫn đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến.');
    
    // Reset form
    document.getElementById('forgot-email').value = '';
}

// Check reset password strength
function checkResetPasswordStrength(password) {
    const bar = document.getElementById('reset-password-strength-bar');
    if (!bar) return;
    
    bar.className = 'password-strength-bar';
    
    if (password.length === 0) {
        bar.style.width = '0';
        return;
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;

    if (strength <= 2) {
        bar.classList.add('weak');
    } else if (strength <= 4) {
        bar.classList.add('medium');
    } else {
        bar.classList.add('strong');
    }
}

// Handle reset password
function handleResetPassword(event) {
    event.preventDefault();
    
    const newPassword = document.getElementById('reset-password').value;
    const confirmPassword = document.getElementById('reset-confirm-password').value;
    
    // Validate passwords
    if (newPassword.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự!');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }
    
    // Check password strength
    if (!newPassword.match(/[a-z]/) || !newPassword.match(/[A-Z]/) || !newPassword.match(/[0-9]/)) {
        alert('Mật khẩu phải bao gồm chữ hoa, chữ thường và số!');
        return;
    }
    
    // Trong thực tế, bạn sẽ xác thực token và cập nhật mật khẩu
    // Ở đây chúng ta giả lập thành công
    
    showSuccessMessage('Mật khẩu của bạn đã được cập nhật thành công!');
    
    // Reset form
    document.getElementById('reset-password').value = '';
    document.getElementById('reset-confirm-password').value = '';
    
    // Đóng modal reset và mở modal login
    setTimeout(() => {
        closeModal('reset-password-modal');
        showLoginModal();
    }, 1500);
}

// Show success message
function showSuccessMessage(message) {
    document.getElementById('success-message').textContent = message;
    document.getElementById('success-modal').classList.add('active');
    
    // Tự động đóng sau 3 giây
    setTimeout(() => {
        closeModal('success-modal');
    }, 3000);
}

// Cập nhật hàm showLoginModal để xóa token cũ
function showLoginModal() {
    closeModal('register-modal');
    closeModal('forgot-password-modal');
    closeModal('reset-password-modal');
    document.getElementById('login-modal').classList.add('active');
}

// Cập nhật hàm showRegisterModal
function showRegisterModal() {
    closeModal('login-modal');
    closeModal('forgot-password-modal');
    closeModal('reset-password-modal');
    document.getElementById('register-modal').classList.add('active');
}

// Cập nhật hàm handleRegister để lưu user mới
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    if (password.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự!');
        return;
    }

    // Lưu user mới vào localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Kiểm tra email đã tồn tại chưa
    if (users.some(user => user.email === email)) {
        alert('Email đã được đăng ký!');
        return;
    }
    
    users.push({
        name: name,
        email: email,
        phone: phone,
        password: password, // Trong thực tế, cần mã hóa mật khẩu
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    closeModal('register-modal');
    showLoginModal();
}

// Cập nhật hàm handleLogin
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    if (!username || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    // Kiểm tra đăng nhập
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === username || u.phone === username);
    
    if (!user || user.password !== password) {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', user.name);
    
    if (remember) {
        localStorage.setItem('rememberedUser', username);
    } else {
        localStorage.removeItem('rememberedUser');
    }
    
    closeModal('login-modal');
    
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';
    document.getElementById('displayName').innerHTML = `<i>👤</i> ${user.name}`;
    
    // Update profile name
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('info-fullname').textContent = user.name;
    
    alert(`Chào mừng ${user.name} đã đăng nhập thành công!`);
}

// ==================== CRUD SERVICES ====================

// Khởi tạo dữ liệu mẫu cho services
// Khởi tạo dữ liệu mẫu cho services
function initServices() {
    let services = localStorage.getItem('services');
    if (!services) {
        const sampleServices = [
            {
                id: 1,
                name: 'Dọn dẹp nhà cửa',
                category: 'cleaning',
                categoryName: 'Dọn dẹp',
                price: 250000,
                duration: 60,
                durationUnit: 'minutes',
                description: 'Dịch vụ dọn dẹp nhà cửa chuyên nghiệp với đội ngũ nhân viên giàu kinh nghiệm',
                image: '',
                status: 'active',
                features: ['Vệ sinh sàn nhà', 'Lau chùi bụi bẩn', 'Vệ sinh nhà vệ sinh', 'Đổ rác'],
                bookings: 45,
                createdAt: '2024-01-15'
            },
            // ... các dịch vụ khác
        ];
        localStorage.setItem('services', JSON.stringify(sampleServices));
    } else {
        // Đảm bảo mỗi service có id là number
        services = JSON.parse(services);
        services = services.map(s => ({
            ...s,
            id: Number(s.id)
        }));
        localStorage.setItem('services', JSON.stringify(services));
    }
}

// Load và hiển thị dịch vụ - DẠNG DỌC GIỐNG NHÂN VIÊN
function loadServices() {
    const servicesList = document.getElementById('services-list');
    const noServices = document.getElementById('no-services');
    
    if (!servicesList) return;

    // Lấy dữ liệu từ localStorage
    const services = JSON.parse(localStorage.getItem('services')) || [];
    
    // Lọc chỉ lấy dịch vụ đang hoạt động
    let activeServices = services.filter(s => s.status === 'active');
    
    // Lọc theo tìm kiếm
    const searchTerm = document.getElementById('search-service')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('filter-category')?.value || '';
    
    if (searchTerm) {
        activeServices = activeServices.filter(s => 
            s.name.toLowerCase().includes(searchTerm) || 
            (s.description && s.description.toLowerCase().includes(searchTerm))
        );
    }
    
    if (categoryFilter) {
        activeServices = activeServices.filter(s => s.category === categoryFilter);
    }

    // Kiểm tra có dịch vụ không
    if (activeServices.length === 0) {
        servicesList.style.display = 'none';
        noServices.style.display = 'block';
        return;
    } else {
        servicesList.style.display = 'block';
        noServices.style.display = 'none';
    }

    // Hiển thị danh sách dịch vụ dạng dọc (giống nhân viên)
    servicesList.innerHTML = activeServices.map(service => {
        // Icon theo danh mục
        const icon = {
            'cleaning': '🧹',
            'repair': '🔧',
            'appliance': '❄️',
            'plumbing': '💧'
        }[service.category] || '🛠️';

        // Format giá
        const price = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(service.price);

        // Format thời lượng
        let duration = '';
        if (service.durationUnit === 'hours') {
            duration = service.duration + ' giờ';
        } else if (service.duration < 60) {
            duration = service.duration + ' phút';
        } else {
            const hours = Math.floor(service.duration / 60);
            const minutes = service.duration % 60;
            duration = hours + ' giờ' + (minutes > 0 ? ' ' + minutes + ' phút' : '');
        }

        return `
            <div class="service-vertical-card" onclick="viewServiceDetail(${service.id})" style="display: flex; align-items: center; gap: 2rem; padding: 1.5rem; background: white; border-radius: 15px; margin-bottom: 1rem; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: all 0.3s; cursor: pointer;">
                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: white; flex-shrink: 0;">
                    ${icon}
                </div>
                
                <div style="flex: 2;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
                        <h3 style="font-size: 1.5rem; color: #333; margin: 0;">${service.name}</h3>
                        <span style="padding: 0.3rem 1rem; background: #f0f3ff; color: #667eea; border-radius: 20px; font-size: 0.9rem;">${service.categoryName || service.category}</span>
                    </div>
                    
                    <div style="display: flex; gap: 2rem; margin-bottom: 0.5rem; color: #666; flex-wrap: wrap;">
                        <span><i>💰</i> <strong style="color: #667eea;">${price}</strong></span>
                        <span><i>⏱️</i> ${duration}</span>
                        <span><i>📋</i> ${service.bookings || 0} lượt đặt</span>
                    </div>
                    
                    <p style="color: #666; margin: 0.5rem 0 0; line-height: 1.5;">
                        ${service.description ? service.description.substring(0, 120) + '...' : 'Không có mô tả'}
                    </p>
                    
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        ${service.features && service.features.length > 0 ? 
                            service.features.slice(0, 2).map(f => `
                                <span style="background: #f0f3ff; color: #667eea; padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.85rem;">
                                    ✓ ${f}
                                </span>
                            `).join('') : ''
                        }
                        ${service.features && service.features.length > 2 ? 
                            `<span style="background: #f0f3ff; color: #667eea; padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.85rem;">
                                +${service.features.length - 2}
                            </span>` : ''
                        }
                    </div>
                </div>
                
                <div style="text-align: center; min-width: 120px;">
                    <button class="btn-book" onclick="event.stopPropagation(); showBookingModal('${service.name}', ${service.price})" style="padding: 0.8rem 1.5rem; width: 100%;">
                        <i>📝</i> Đặt ngay
                    </button>
                    <button class="btn-book" onclick="event.stopPropagation(); viewServiceDetail(${service.id})" style="padding: 0.5rem 1rem; margin-top: 0.5rem; background: #6c757d; width: 100%;">
                        <i>👁️</i> Chi tiết
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Xem chi tiết dịch vụ
function viewServiceDetail(serviceId) {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    const service = services.find(s => s.id == serviceId);
    
    if (!service) return;

    // Format giá
    const price = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(service.price);

    // Format thời lượng
    let duration = '';
    if (service.durationUnit === 'hours') {
        duration = service.duration + ' giờ';
    } else if (service.duration < 60) {
        duration = service.duration + ' phút';
    } else {
        const hours = Math.floor(service.duration / 60);
        const minutes = service.duration % 60;
        duration = hours + ' giờ' + (minutes > 0 ? ' ' + minutes + ' phút' : '');
    }

    // Icon theo danh mục
    const icon = {
        'cleaning': '🧹',
        'repair': '🔧',
        'appliance': '❄️',
        'plumbing': '💧'
    }[service.category] || '🛠️';

    // Lấy modal và nội dung
    const modal = document.getElementById('service-detail-modal');
    const content = document.getElementById('service-detail-content');
    
    if (!modal || !content) return;

    // Tạo nội dung chi tiết
    content.innerHTML = `
        <div style="display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap; align-items: center;">
            <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white;">
                ${icon}
            </div>
            <div style="flex: 1;">
                <h3 style="font-size: 2rem; color: #333; margin-bottom: 0.5rem;">${service.name}</h3>
                <span style="display: inline-block; padding: 0.3rem 1rem; background: #f0f3ff; color: #667eea; border-radius: 20px;">${service.categoryName || service.category}</span>
            </div>
        </div>

        <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem;">
            <div style="display: flex; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <span style="width: 100px; color: #666;">Giá:</span>
                <span style="flex: 1; color: #667eea; font-size: 1.5rem; font-weight: bold;">${price}</span>
            </div>
            <div style="display: flex; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <span style="width: 100px; color: #666;">Thời lượng:</span>
                <span style="flex: 1; color: #333;">${duration}</span>
            </div>
            <div style="display: flex; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e0e0e0;">
                <span style="width: 100px; color: #666;">Mô tả:</span>
                <span style="flex: 1; color: #333;">${service.description || 'Không có mô tả'}</span>
            </div>
            ${service.features && service.features.length > 0 ? `
            <div style="display: flex;">
                <span style="width: 100px; color: #666;">Tính năng:</span>
                <div style="flex: 1;">
                    ${service.features.map(f => `
                        <span style="display: inline-block; padding: 0.2rem 0.8rem; background: white; color: #667eea; border-radius: 20px; margin: 0.2rem; border: 1px solid #667eea;">
                            ✓ ${f}
                        </span>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;

    // Cập nhật nút đặt dịch vụ
    const bookBtn = document.getElementById('detail-book-btn');
    if (bookBtn) {
        bookBtn.setAttribute('onclick', `showBookingModal('${service.name}', ${service.price})`);
    }

    // Hiển thị modal
    modal.classList.add('active');
}

// Đóng modal chi tiết dịch vụ
function closeServiceDetailModal() {
    const modal = document.getElementById('service-detail-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Cập nhật số lượt đặt khi có booking mới
function updateServiceBookings(serviceName) {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    const serviceIndex = services.findIndex(s => s.name === serviceName);
    
    if (serviceIndex !== -1) {
        services[serviceIndex].bookings = (services[serviceIndex].bookings || 0) + 1;
        localStorage.setItem('services', JSON.stringify(services));
    }
}

// Initialize on load
window.onload = function() {
    initSampleData();
    initServices();
    
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
        if (userName) {
            document.getElementById('displayName').innerHTML = `<i>👤</i> ${userName}`;
            document.getElementById('profile-name').textContent = userName;
            document.getElementById('info-fullname').textContent = userName;
        }
    }
    
    // Set default date for booking
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
        dateInput.min = today;
    }
    
    // Load dữ liệu cho các section
    refreshAllSections();
};

// Đặt dịch vụ từ modal chi tiết
function bookFromDetail() {
    const bookBtn = document.getElementById('detail-book-btn');
    const onclickAttr = bookBtn.getAttribute('onclick');
    if (onclickAttr) {
        eval(onclickAttr);
    }
    closeServiceDetailModal();
}

// Thêm hàm này vào file main.js để xử lý chỉnh sửa thông tin cá nhân
function editProfile() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'edit-profile-modal';
    
    // Lấy thông tin hiện tại
    const currentName = document.getElementById('info-fullname').textContent;
    const currentEmail = document.getElementById('info-email').textContent;
    const currentPhone = document.getElementById('info-phone').textContent;
    const currentDob = document.getElementById('info-dob').textContent;
    const currentAddress = document.getElementById('info-address').textContent;
    const currentGender = document.getElementById('info-gender').textContent;
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; padding: 0; overflow: hidden;">
            <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px 25px;">
                <h2 style="color: white; display: flex; align-items: center; gap: 10px;">
                    <span>✏️</span> Chỉnh sửa thông tin cá nhân
                </h2>
                <span class="close-modal" onclick="closeEditProfileModal()" style="color: white; font-size: 32px; cursor: pointer;">&times;</span>
            </div>
            
            <form id="edit-profile-form" onsubmit="saveProfileChanges(event)" style="padding: 25px; max-height: 70vh; overflow-y: auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                    <div class="form-group">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">
                            Họ và tên <span style="color: #dc3545;">*</span>
                        </label>
                        <input type="text" id="edit-fullname" value="${currentName}" required
                            style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px;">
                    </div>
                    
                    <div class="form-group">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">
                            Email <span style="color: #dc3545;">*</span>
                        </label>
                        <input type="email" id="edit-email" value="${currentEmail}" required
                            style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px;">
                    </div>
                    
                    <div class="form-group">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">
                            Số điện thoại <span style="color: #dc3545;">*</span>
                        </label>
                        <input type="tel" id="edit-phone" value="${currentPhone}" required
                            style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px;">
                    </div>
                    
                    <div class="form-group">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">
                            Ngày sinh
                        </label>
                        <input type="date" id="edit-dob" value="${formatDateForInput(currentDob)}"
                            style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px;">
                    </div>
                    
                    <div class="form-group" style="grid-column: 1 / -1;">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">
                            Địa chỉ
                        </label>
                        <textarea id="edit-address" rows="2" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px;">${currentAddress}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">
                            Giới tính
                        </label>
                        <select id="edit-gender" style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px;">
                            <option value="Nam" ${currentGender === 'Nam' ? 'selected' : ''}>Nam</option>
                            <option value="Nữ" ${currentGender === 'Nữ' ? 'selected' : ''}>Nữ</option>
                            <option value="Khác" ${currentGender === 'Khác' ? 'selected' : ''}>Khác</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label style="display: block; margin-bottom: 8px; color: #333; font-weight: 500;">
                            Thay đổi mật khẩu
                        </label>
                        <input type="password" id="edit-password" placeholder="Để trống nếu không đổi"
                            style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px;">
                    </div>
                </div>
                
                <div style="display: flex; gap: 15px; margin-top: 25px;">
                    <button type="button" onclick="closeEditProfileModal()" 
                        style="flex: 1; padding: 14px; background: #6c757d; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer;">
                        Hủy
                    </button>
                    <button type="submit" 
                        style="flex: 2; padding: 14px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer;">
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Hàm đóng modal chỉnh sửa
function closeEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) {
        modal.remove();
    }
}

// Hàm format date cho input
function formatDateForInput(dateString) {
    if (!dateString) return '';
    try {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`; // Chuyển từ dd/mm/yyyy sang yyyy-mm-dd
        }
    } catch (e) {
        return '';
    }
    return '';
}

// Hàm format date từ input về dd/mm/yyyy
function formatDateFromInput(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (e) {
        return '';
    }
}

// Hàm lưu thay đổi thông tin cá nhân
function saveProfileChanges(event) {
    event.preventDefault();
    
    // Lấy giá trị từ form
    const newName = document.getElementById('edit-fullname').value;
    const newEmail = document.getElementById('edit-email').value;
    const newPhone = document.getElementById('edit-phone').value;
    const newDob = formatDateFromInput(document.getElementById('edit-dob').value);
    const newAddress = document.getElementById('edit-address').value;
    const newGender = document.getElementById('edit-gender').value;
    const newPassword = document.getElementById('edit-password').value;
    
    // Validate
    if (!newName || !newEmail || !newPhone) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    if (!validateEmail(newEmail)) {
        alert('Email không hợp lệ!');
        return;
    }
    
    if (!validatePhone(newPhone)) {
        alert('Số điện thoại không hợp lệ!');
        return;
    }
    
    // Cập nhật thông tin trên giao diện
    document.getElementById('info-fullname').textContent = newName;
    document.getElementById('info-email').textContent = newEmail;
    document.getElementById('info-phone').textContent = newPhone;
    document.getElementById('info-dob').textContent = newDob || '01/01/1990';
    document.getElementById('info-address').textContent = newAddress || 'Chưa cập nhật';
    document.getElementById('info-gender').textContent = newGender;
    
    // Cập nhật tên trong header
    document.getElementById('profile-name').textContent = newName;
    document.getElementById('displayName').innerHTML = `<i>👤</i> ${newName}`;
    
    // Cập nhật user object
    currentUser = {
        ...currentUser,
        name: newName,
        email: newEmail,
        phone: newPhone,
        dob: newDob || currentUser.dob,
        address: newAddress || currentUser.address,
        gender: newGender
    };
    
    // Cập nhật localStorage
    localStorage.setItem('userName', newName);
    
    // Cập nhật thông tin user trong users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUserEmail = document.getElementById('info-email').textContent;
    const userIndex = users.findIndex(u => u.email === currentUserEmail || u.phone === currentUserPhone);
    
    if (userIndex !== -1) {
        users[userIndex].name = newName;
        users[userIndex].email = newEmail;
        users[userIndex].phone = newPhone;
        users[userIndex].address = newAddress;
        
        if (newPassword) {
            users[userIndex].password = newPassword;
        }
        
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Hiển thị thông báo thành công
    showSuccessMessage('Cập nhật thông tin thành công!');
    
    // Đóng modal
    closeEditProfileModal();
    
    // Refresh activity timeline
    loadActivityTimeline();
}

// Hàm validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Hàm validate số điện thoại
function validatePhone(phone) {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Thêm hàm showSuccessMessage nếu chưa có
function showSuccessMessage(message) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px; text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem; color: #28a745;">✅</div>
            <h3 style="color: #333; margin-bottom: 1rem;">Thành công!</h3>
            <p style="color: #666; margin-bottom: 1.5rem;">${message}</p>
            <button onclick="this.closest('.modal').remove()" 
                style="padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">
                Đóng
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Tự động đóng sau 2 giây
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 2000);
}

// ==================== PUBLIC STAFF DISPLAY ====================

// Load và hiển thị danh sách nhân viên cho giao diện người dùng (dạng dọc)
function loadPublicStaff() {
    const staffList = document.getElementById('public-staff-list');
    const noStaff = document.getElementById('no-public-staff');
    
    if (!staffList) return;

    // Lấy dữ liệu từ localStorage
    const staff = JSON.parse(localStorage.getItem('staff')) || [];
    
    // Lọc chỉ lấy nhân viên đang hoạt động
    let activeStaff = staff.filter(s => s.status === 'active');
    
    // Lọc theo tìm kiếm
    const searchTerm = document.getElementById('public-staff-search')?.value.toLowerCase() || '';
    const specialtyFilter = document.getElementById('public-staff-specialty')?.value || '';
    
    if (searchTerm) {
        activeStaff = activeStaff.filter(s => 
            s.name.toLowerCase().includes(searchTerm) || 
            (s.phone && s.phone.includes(searchTerm))
        );
    }
    
    if (specialtyFilter) {
        activeStaff = activeStaff.filter(s => s.specialty === specialtyFilter);
    }

    // Kiểm tra có nhân viên không
    if (activeStaff.length === 0) {
        staffList.style.display = 'none';
        noStaff.style.display = 'block';
        return;
    } else {
        staffList.style.display = 'block';
        noStaff.style.display = 'none';
    }

    // Hiển thị danh sách nhân viên dạng dọc
    staffList.innerHTML = activeStaff.map(staff => {
        // Icon theo chuyên môn
        const icon = {
            'cleaning': '🧹',
            'repair': '🔧',
            'appliance': '❄️',
            'plumbing': '💧',
            'all': '👥'
        }[staff.specialty] || '👤';

        // Format đánh giá
        const rating = staff.rating || 4.5;
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '⭐';
        if (halfStar) stars += '½';
        for (let i = 0; i < emptyStars; i++) stars += '☆';

        // Chuyên môn hiển thị
        const specialtyNames = {
            'cleaning': 'Dọn dẹp',
            'repair': 'Sửa chữa',
            'appliance': 'Điện máy',
            'plumbing': 'Sửa ống nước',
            'all': 'Đa năng'
        };
        const specialtyDisplay = specialtyNames[staff.specialty] || staff.specialty;

        return `
            <div class="staff-vertical-card" onclick="viewPublicStaffDetail(${staff.id})" style="display: flex; align-items: center; gap: 2rem; padding: 1.5rem; background: white; border-radius: 15px; margin-bottom: 1rem; box-shadow: 0 5px 20px rgba(0,0,0,0.05); transition: all 0.3s; cursor: pointer;">
                <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; color: white; flex-shrink: 0;">
                    ${icon}
                </div>
                
                <div style="flex: 2;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
                        <h3 style="font-size: 1.5rem; color: #333; margin: 0;">${staff.name}</h3>
                        <span style="padding: 0.3rem 1rem; background: #f0f3ff; color: #667eea; border-radius: 20px; font-size: 0.9rem;">${specialtyDisplay}</span>
                    </div>
                    
                    <div style="display: flex; gap: 2rem; margin-bottom: 0.5rem; color: #666; flex-wrap: wrap;">
                        <span><i>🌟</i> ${stars} (${staff.rating || 4.5})</span>
                        <span><i>📞</i> ${staff.phone}</span>
                        <span><i>📅</i> ${staff.experience || 0} năm kinh nghiệm</span>
                    </div>
                    
                    <p style="color: #666; margin: 0.5rem 0 0; line-height: 1.5;">
                        ${staff.description || 'Nhân viên chuyên nghiệp, giàu kinh nghiệm, được đào tạo bài bản.'}
                    </p>
                    
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <span style="background: #28a745; color: white; padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.85rem;">
                            <i>✅</i> Sẵn sàng
                        </span>
                        <span style="background: #17a2b8; color: white; padding: 0.2rem 1rem; border-radius: 20px; font-size: 0.85rem;">
                            <i>📋</i> ${staff.bookings || 0} đơn đã nhận
                        </span>
                    </div>
                </div>
                
                <div style="text-align: center; min-width: 120px;">
                    <button class="btn-book" onclick="event.stopPropagation(); showBookingModalWithStaff('${staff.name}')" style="padding: 0.8rem 1.5rem; width: 100%;">
                        <i>📝</i> Đặt ngay
                    </button>
                    <button class="btn-book" onclick="event.stopPropagation(); viewPublicStaffDetail(${staff.id})" style="padding: 0.5rem 1rem; margin-top: 0.5rem; background: #6c757d; width: 100%;">
                        <i>👁️</i> Xem hồ sơ
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Tìm kiếm nhân viên public
function searchPublicStaff() {
    loadPublicStaff();
}

// Lọc nhân viên public
function filterPublicStaff() {
    loadPublicStaff();
}

// Xem chi tiết nhân viên (public) - CÓ SCROLL
function viewPublicStaffDetail(staffId) {
    const staff = JSON.parse(localStorage.getItem('staff')) || [];
    const staffItem = staff.find(s => s.id == staffId);
    
    if (!staffItem) return;

    // Icon theo chuyên môn
    const icon = {
        'cleaning': '🧹',
        'repair': '🔧',
        'appliance': '❄️',
        'plumbing': '💧',
        'all': '👥'
    }[staffItem.specialty] || '👤';

    // Format đánh giá
    const rating = staffItem.rating || 4.5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    if (halfStar) stars += '½';
    for (let i = 0; i < emptyStars; i++) stars += '';

    // Chuyên môn hiển thị
    const specialtyNames = {
        'cleaning': 'Dọn dẹp',
        'repair': 'Sửa chữa',
        'appliance': 'Điện máy',
        'plumbing': 'Sửa ống nước',
        'all': 'Đa năng'
    };
    const specialtyDisplay = specialtyNames[staffItem.specialty] || staffItem.specialty;

    // Tạo modal xem chi tiết - CÓ SCROLL
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'public-staff-detail-modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px; padding: 0; overflow: hidden; max-height: 80vh; display: flex; flex-direction: column;">
            <div class="modal-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px 25px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;">
                <h2 style="color: white; display: flex; align-items: center; gap: 10px; margin: 0;">
                    <span>${icon}</span> Hồ sơ nhân viên
                </h2>
                <span class="close-modal" onclick="closePublicStaffDetailModal()" style="color: white; font-size: 32px; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); border-radius: 50%;">&times;</span>
            </div>
            
            <!-- PHẦN CÓ THỂ SCROLL -->
            <div style="padding: 2rem; overflow-y: auto; flex: 1;" class="staff-detail-scrollable">
                <div style="display: flex; gap: 2rem; margin-bottom: 2rem; align-items: center; flex-wrap: wrap;">
                    <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: white; flex-shrink: 0;">
                        ${icon}
                    </div>
                    <div style="flex: 1;">
                        <h3 style="font-size: 2rem; color: #333; margin-bottom: 0.5rem;">${staffItem.name}</h3>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <span style="padding: 0.3rem 1rem; background: #f0f3ff; color: #667eea; border-radius: 20px;">${specialtyDisplay}</span>
                            <span style="color: #ffd700; font-size: 1.2rem;">${stars}</span>
                        </div>
                    </div>
                </div>
                
                <!-- THÔNG TIN CHI TIẾT -->
                <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px;">
                    <div style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                        <span style="width: 120px; font-weight: 600; color: #666;">Số điện thoại:</span>
                        <span style="flex: 1; color: #333;">${staffItem.phone}</span>
                    </div>
                    <div style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                        <span style="width: 120px; font-weight: 600; color: #666;">Email:</span>
                        <span style="flex: 1; color: #333;">${staffItem.email || 'Chưa cập nhật'}</span>
                    </div>
                    <div style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                        <span style="width: 120px; font-weight: 600; color: #666;">Kinh nghiệm:</span>
                        <span style="flex: 1; color: #333;">${staffItem.experience || 0} năm</span>
                    </div>
                    <div style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                        <span style="width: 120px; font-weight: 600; color: #666;">Đánh giá:</span>
                        <span style="flex: 1; color: #333;">${stars} (${staffItem.rating || 4.5})</span>
                    </div>
                    <div style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                        <span style="width: 120px; font-weight: 600; color: #666;">Đơn đã nhận:</span>
                        <span style="flex: 1; color: #333;">${staffItem.bookings || 0} đơn</span>
                    </div>
                    <div style="display: flex; margin-bottom: 1rem; padding: 0.5rem; background: white; border-radius: 8px;">
                        <span style="width: 120px; font-weight: 600; color: #666;">Mô tả:</span>
                        <span style="flex: 1; color: #333;">${staffItem.description || 'Nhân viên chuyên nghiệp, giàu kinh nghiệm, được đào tạo bài bản.'}</span>
                    </div>
                    
                    <!-- ĐÁNH GIÁ TỪ KHÁCH HÀNG -->
                    <div style="margin-top: 2rem;">
                        <h4 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i>💬</i> Đánh giá gần đây
                        </h4>
                        
                        <div style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="font-weight: 600;">Nguyễn Thị Hương</span>
                                <span style="color: #ffd700;">★★★★★</span>
                            </div>
                            <p style="color: #666; font-size: 0.9rem;">Nhân viên làm việc rất tốt, vệ sinh sạch sẽ, thân thiện.</p>
                            <small style="color: #999;">2 ngày trước</small>
                        </div>
                        
                        <div style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="font-weight: 600;">Trần Văn Minh</span>
                                <span style="color: #ffd700;">★★★★★</span>
                            </div>
                            <p style="color: #666; font-size: 0.9rem;">Chuyên nghiệp, đúng giờ, tay nghề cao. Sẽ ủng hộ lần sau.</p>
                            <small style="color: #999;">5 ngày trước</small>
                        </div>
                        
                        <div style="background: white; padding: 1rem; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span style="font-weight: 600;">Lê Thị Mai</span>
                                <span style="color: #ffd700;">★★★★☆</span>
                            </div>
                            <p style="color: #666; font-size: 0.9rem;">Làm việc tốt, giá cả hợp lý. Có thể cải thiện thêm về tốc độ.</p>
                            <small style="color: #999;">1 tuần trước</small>
                        </div>
                    </div>
                    
                    <!-- DỊCH VỤ NHÂN VIÊN ĐẢM NHẬN -->
                    <div style="margin-top: 2rem;">
                        <h4 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i>🛠️</i> Dịch vụ đảm nhận
                        </h4>
                        
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            <span style="padding: 0.5rem 1rem; background: white; border: 1px solid #667eea; color: #667eea; border-radius: 20px;">Dọn dẹp nhà cửa</span>
                            <span style="padding: 0.5rem 1rem; background: white; border: 1px solid #667eea; color: #667eea; border-radius: 20px;">Giặt thảm</span>
                            <span style="padding: 0.5rem 1rem; background: white; border: 1px solid #667eea; color: #667eea; border-radius: 20px;">Vệ sinh sofa</span>
                            <span style="padding: 0.5rem 1rem; background: white; border: 1px solid #667eea; color: #667eea; border-radius: 20px;">Lau kính</span>
                        </div>
                    </div>
                    
                    <!-- CHỨNG CHỈ/KỸ NĂNG -->
                    <div style="margin-top: 2rem;">
                        <h4 style="color: #333; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i>📜</i> Chứng chỉ & Kỹ năng
                        </h4>
                        
                        <ul style="list-style: none; padding: 0;">
                            <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <span style="color: #28a745;">✓</span> Chứng chỉ vệ sinh công nghiệp
                            </li>
                            <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <span style="color: #28a745;">✓</span> Kỹ năng xử lý vết bẩn cứng đầu
                            </li>
                            <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                                <span style="color: #28a745;">✓</span> Sử dụng máy móc chuyên dụng
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- PHẦN NÚT CỐ ĐỊNH Ở DƯỚI -->
            <div style="padding: 1.5rem 2rem; border-top: 1px solid #e0e0e0; background: white; flex-shrink: 0; display: flex; gap: 1rem;">
                <button class="btn-book" onclick="closePublicStaffDetailModal(); showBookingModalWithStaff('${staffItem.name}')" style="flex: 2;">
                    <i>📝</i> Đặt dịch vụ với ${staffItem.name.split(' ').pop()}
                </button>
                <button class="btn-book" onclick="closePublicStaffDetailModal()" style="flex: 1; background: #6c757d;">
                    Đóng
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Đóng modal chi tiết nhân viên
function closePublicStaffDetailModal() {
    const modal = document.getElementById('public-staff-detail-modal');
    if (modal) {
        modal.remove();
    }
}

// Hiển thị modal đặt dịch vụ với nhân viên cụ thể
function showBookingModalWithStaff(staffName) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
        alert('Vui lòng đăng nhập để đặt dịch vụ!');
        showLoginModal();
        return;
    }
    
    // Mở modal đặt dịch vụ và tự động điền ghi chú
    showBookingModal('Dịch vụ', 250000); // Giá mặc định
    document.getElementById('booking-notes').value = `Yêu cầu nhân viên: ${staffName}`;
}

// Copy to clipboard function with animation
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Tạo toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 9999;
            animation: slideUp 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        toast.innerHTML = '✅ Đã sao chép: ' + text;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }).catch(err => {
        console.error('Không thể sao chép: ', err);
        alert('Không thể sao chép tự động. Vui lòng copy thủ công: ' + text);
    });
}