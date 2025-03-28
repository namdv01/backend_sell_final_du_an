const MESSAGE = {
  EMAIL_INVALID: 'Email không hợp lệ',
  EMAIL_REQUIRED: 'Thiếu email',
  PASSWORD_INVALID: 'Mật khẩu không hợp lệ',
  PASSWORD_REQUIRED: 'Thiếu mật khẩu',
  NEWPASSWORD_INVALID: 'Mật khẩu mới không hợp lệ',
  NEWPASSWORD_REQUIRED: 'Thiếu mật khẩu mới',
  NEWPASSWORD_NOT_MATCH_CURRENTPASSWORD: 'Mật khẩu mới không trùng với mật khẩu cũ',
  FULLNAME_INVALID: 'Tên người dùng không hợp lệ',
  FULLNAME_REQUIRED: 'Thiếu tên người dùng',
  GENDER_INVALID: 'Giới tính không hợp lệ',
  GENDER_REQUIRED: 'Thiếu giới tính',
  PHONE_INVALID: 'Số điện thoại không hợp lệ',
  PHONE_REQUIRED: 'Thiếu số điện thoại',
  AVATAR_INVALID: 'Ảnh đại diện không hợp lệ',
  ROLE_INVALID: 'Vai trò không hợp lệ',
  ROLE_REQUIRED: 'Thiếu vai trò',
  IS_NOT_AUTH: 'Chưa được xác thực',
  IS_NOT_AUTH_ADMIN: 'Không phải quản trị viên',
  IS_NOT_AUTH_SELLER: 'Không phải người bán',
  IS_NOT_AUTH_BUYER: 'Không phải người mua',
  INFORMATION_INVALID: 'Thông tin không hợp lệ',
  EMAIL_BE_USED: 'Email đã được sử dụng',
  REGISTER_SUCCESS: 'Đăng ký thành công',
  LOGOUT_SUCCESS: 'Đăng xuất thành công',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  CREATE_SHOP_SUCCESS: 'Tạo gian hàng thành công',
  CREATE_PRODUCT_SUCCESS: 'Tạo thêm sản phẩm thành công',
  EDIT_PRODUCT_SUCCESS: 'Chỉnh sửa sản phẩm thành công',
  DEL_PRODUCT_SUCCESS: 'Xóa sản phẩm thành công',
  EDIT_SHOP_SUCCESS: 'Sửa thông tin gian hàng thành công',
  DEL_SHOP_SUCCESS: 'Xóa gian hàng thành công',
  EDIT_CART_SUCCESS: 'Cập nhật giỏ hàng thành công',
  ORDER_SUCCESS: 'Đặt đơn hàng thành công',
  ORDER_FAIL: 'Đặt đơn hàng thất bại',
  CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',
  EMAIL_RESET_PASSWORD_BE_SEND: 'Email yêu cầu đổi mật khẩu được gửi',
  SUBJECT_FORGET_PASSWORD: 'THAY ĐỔI MẬT KHẨU',
  TOKEN_INVALID: 'Mã code không hợp lệ',
  TOKEN_REQUIRED: 'Thiếu mã code',
  UPDATE_PROFILE_SUCCESS: 'Cập nhật hồ sơ cá nhân thành công',
  NOT_ALLOW: 'không đúng quyền hạn',
  PAGE_NOK: 'số trang không hợp lệ',
  SIZE_NOK: 'kích thước trang không hợp lệ',
  ID_NOK: 'id không hợp lệ',
  GET_LIST_USER_SUCCESS: 'lấy danh sách người dùng thành công',
  GET_LIST_SHOP_SUCCESS: 'lấy danh sách gian hàng thành công',
  GET_LIST_PRODUCT_SUCCESS: 'lấy danh sách sản phẩm thành công',
  GET_LIST_ORDER_SUCCESS: 'lấy danh sách đơn hàng thành công',
  GET_LIST_COMMENT_SUCCESS: 'lấy danh sách bình luận thành công',
  MAX_PRICE_NOK: 'giá tối đa không hợp lệ',
  MIN_PRICE_NOK: 'giá tối thiểu không hợp lệ',
  PRICE_NOK: 'giá không hợp lệ',
  NAME_NOK: 'tên không hợp lệ',
  SEARCH_PRODUCT_SUCCESS: 'tìm kiếm sản phẩm thành công',
  QUANTITY_NOK: 'số lượng không hợp lệ',
  IMAGE_ARRAY: 'mảng ảnh không hợp lệ',
  STATUS_ORDER_NOK: 'trạng thái đơn hàng không hợp lệ',
  PAYMENT_NOK: 'trạng thái thanh toán không hợp lệ',
  NAME_SHOP_REQUIRED: 'thiếu tên gian hàng',
  ADDRESS_SHOP_REQUIRED: 'thiếu địa chỉ gian hàng',
  LOGO_SHOP_REQUIRED: 'thiếu logo gian hàng',
  ID_ORDER_REQUIRED: 'Thiếu mã đơn hàng',
  ID_PRODUCT_REQUIRED: 'Thiếu mã sản phẩm',
  ID_USER_REQUIRED: 'Thiếu mã người dùng',
  STATUS_ORDER_REQUIRED: 'Thiếu trạng thái đơn hàng',
  CONTENT_ORDER_REQUIRED: 'Thiếu nội dung bình luận',
  ORDER_REQUIRED: 'Thiếu chi tiết đơn hàng',
  NOT_OWN_SHOP: 'Gian hàng không thuộc quản lý',
  NOT_OWN_ORDER: 'Đơn hàng không thuộc quyền quản lý',
  IMAGE_INVALID: 'Ảnh không hợp lệ',
  NOT_OWN_PRODUCT: 'Sản phẩm không thuộc quản lý',
  LIMIT_CREATE_SHOP: 'Bạn đang bị giới hạn khả năng tạo gian hàng',
  EDIT_ORDER_SUCCESS: 'Thay đổi thông tin đơn hàng thành công',
  EDIT_ORDER_FAIL: 'Không thể thay đổi thông tin đơn hàng',
  GET_ORDER_SUCCESS: 'Lấy thông tin đơn hàng thành công',
  GET_LST_ORDER_SUCCESS: 'Lấy danh sách đơn hàng của gian hàng thành công',
  COMMENT_CONTENT_NOK: 'Nội dung bình luận không hợp lệ',
  STAR_NOK: 'Vote đánh giá không hợp lệ',
  NOT_ACCEPT_CHANGE_STATUS_ORDER: 'Chỉnh trạng thái đơn hàng không hợp lệ',
  NOT_ACCEPT_COMMENT: 'Đã tồn tại bình luận về đơn hàng và sản phẩm',
  COMMENT_SUCCESS: 'Bình luận thành công',
  GET_DETAIL_ORDER_SUCCESS: 'Lấy chi tiết đơn hàng thành công',
  GET_DETAIL_COMMENT_SUCCESS: 'Lấy chi tiết comment thành công',
  NOT_UPDATE_ACCEPT: 'Thay đổi không hợp lệ',
  GET_CART_SUCCESS: 'Lấy giỏ hàng thành công',
  PRODUCTS_IN_CART: 'Sản phẩm trong giỏ hàng không hợp lệ',
  SEARCH_OWN_SHOP_SUCCESS: 'Danh sách gian hàng sở hữu',
}

module.exports = MESSAGE;