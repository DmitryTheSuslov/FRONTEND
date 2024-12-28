/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Address {
  /** Address id */
  address_id?: number;
  /**
   * Адрес
   * @minLength 1
   * @maxLength 100
   */
  address_name?: string;
  /**
   * Площадь
   * @min -2147483648
   * @max 2147483647
   */
  area?: number;
  /**
   * Photo
   * @maxLength 100
   */
  photo?: string | null;
  /**
   * Status
   * @maxLength 100
   */
  status?: string;
}

export interface Fixations {
  /** Fixation id */
  fixation_id?: number;
  /** Status */
  status?: 1 | 2 | 3 | 4 | 5 | null;
  /**
   * Месяц
   * @min -2147483648
   * @max 2147483647
   */
  month?: number;
  /** Addresses */
  addresses?: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string | null;
  /**
   * Submitted at
   * @format date-time
   */
  submitted_at?: string | null;
  /**
   * Completed at
   * @format date-time
   */
  completed_at?: string | null;
  /** Owner */
  owner?: string;
  /** Moderator */
  moderator?: string;
  /** Addresses count */
  addresses_count?: string;
  /** Pay date */
  pay_date?: string;
}

export interface AddressFixation {
  /** Mm id */
  mm_id?: number;
  /**
   * Поле м-м
   * @min -2147483648
   * @max 2147483647
   */
  water_counter_value?: number | null;
  /**
   * Pay date
   * @format date
   */
  pay_date?: string | null;
  /** Address */
  address?: number | null;
  /** Fixation */
  fixation?: number | null;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  addresses = {
    /**
     * No description
     *
     * @tags addresses
     * @name AddressesCreateCreate
     * @request POST:/addresses/create/
     * @secure
     */
    addressesCreateCreate: (data: Address, params: RequestParams = {}) =>
      this.request<Address, any>({
        path: `/addresses/create/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags addresses
     * @name AddressesSearchList
     * @request GET:/addresses/search/
     * @secure
     */
    addressesSearchList: (query?: { name?: string }, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/addresses/search/`,
        method: "GET",
        secure: true,
        query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags addresses
     * @name AddressesRead
     * @request GET:/addresses/{address_id}/
     * @secure
     */
    addressesRead: (addressId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/addresses/${addressId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags addresses
     * @name AddressesAddToFixCreate
     * @request POST:/addresses/{address_id}/add_to_fix/
     * @secure
     */
    addressesAddToFixCreate: (addressId: string, data: Fixations, params: RequestParams = {}) =>
      this.request<Fixations, any>({
        path: `/addresses/${addressId}/add_to_fix/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags addresses
     * @name AddressesDeleteDelete
     * @request DELETE:/addresses/{address_id}/delete/
     * @secure
     */
    addressesDeleteDelete: (addressId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/addresses/${addressId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags addresses
     * @name AddressesUpdateUpdate
     * @request PUT:/addresses/{address_id}/update/
     * @secure
     */
    addressesUpdateUpdate: (addressId: string, data: Address, params: RequestParams = {}) =>
      this.request<Address, any>({
        path: `/addresses/${addressId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags addresses
     * @name AddressesUpdateImageCreate
     * @request POST:/addresses/{address_id}/update_image/
     * @secure
     */
    addressesUpdateImageCreate: (addressId: string, data: Address, params: RequestParams = {}) =>
      this.request<Address, any>({
        path: `/addresses/${addressId}/update_image/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  fixations = {
    /**
     * No description
     *
     * @tags fixations
     * @name FixationsSearchList
     * @request GET:/fixations/search/
     * @secure
     */
    fixationsSearchList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/fixations/search/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fixations
     * @name FixationsRead
     * @request GET:/fixations/{fix_id}/
     * @secure
     */
    fixationsRead: (fixId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/fixations/${fixId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fixations
     * @name FixationsDeleteDelete
     * @request DELETE:/fixations/{fix_id}/delete/
     * @secure
     */
    fixationsDeleteDelete: (fixId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/fixations/${fixId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fixations
     * @name FixationsDeleteAddressDelete
     * @request DELETE:/fixations/{fix_id}/delete_address/{address_id}/
     * @secure
     */
    fixationsDeleteAddressDelete: (fixId: string, addressId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/fixations/${fixId}/delete_address/${addressId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags fixations
     * @name FixationsUpdateUpdate
     * @request PUT:/fixations/{fix_id}/update/
     * @secure
     */
    fixationsUpdateUpdate: (fixId: string, data: Fixations, params: RequestParams = {}) =>
      this.request<Fixations, any>({
        path: `/fixations/${fixId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags fixations
     * @name FixationsUpdateAddressUpdate
     * @request PUT:/fixations/{fix_id}/update_address/{address_id}/
     * @secure
     */
    fixationsUpdateAddressUpdate: (
      fixId: string,
      addressId: string,
      data: AddressFixation,
      params: RequestParams = {},
    ) =>
      this.request<AddressFixation, any>({
        path: `/fixations/${fixId}/update_address/${addressId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags fixations
     * @name FixationsUpdateStatusAdminUpdate
     * @request PUT:/fixations/{fix_id}/update_status_admin/
     * @secure
     */
    fixationsUpdateStatusAdminUpdate: (fixId: string, data: Fixations, params: RequestParams = {}) =>
      this.request<Fixations, any>({
        path: `/fixations/${fixId}/update_status_admin/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags fixations
     * @name FixationsUpdateStatusUserUpdate
     * @request PUT:/fixations/{fix_id}/update_status_user/
     * @secure
     */
    fixationsUpdateStatusUserUpdate: (fixId: string, data: Fixations, params: RequestParams = {}) =>
      this.request<Fixations, any>({
        path: `/fixations/${fixId}/update_status_user/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserWhoamiList
     * @request GET:/user/whoami/
     * @secure
     */
    userWhoamiList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/whoami/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login
     * @secure
     */
    usersLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<UserLogin, any>({
        path: `/users/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/update/
     * @secure
     */
    usersUpdateUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
