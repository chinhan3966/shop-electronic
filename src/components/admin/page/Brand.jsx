import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiFillFolderAdd } from "react-icons/ai";

import {
  MdOutlineUpdate,
  MdDeleteForever,
  MdSystemUpdateAlt,
} from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Helmet from "../../common/Helmet";
const Brand = () => {
  const [listBrand, setListBrand] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [id, setId] = useState(0);
  const [blockAdd, setBlockAdd] = useState(false);
  const [blockUpdate, setBlockUpdate] = useState(true);
  const [reRender, setReRender] = useState(0);
  const token = useSelector((state) => state.token.tokenDefault);

  useEffect(async () => {
    let res = await axios.get("http://localhost:8085/api/v1/brand/get-all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res && res.data && res.data.data) {
      setListBrand(res.data.data);
    }
  }, [reRender]);

  const handleAddBrand = async () => {
    if (!name) {
      alert("Bạn chưa thêm tên thương hiệu");
      return;
    }

    if (!link) {
      alert("Bạn chưa thêm hình ảnh thương hiệu");
      return;
    }

    let dataState = {
      brandName: name,
      urlLogo: link,
    };

    let res = await axios({
      method: "POST",
      url: "http://localhost:8085/api/v1/brand/insert",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: dataState,
    });
    if (res && res.data && res.data.status === 200) {
      toast.success("Add brand success");
      setName("");
      setLink("");
      const random = Math.floor(Math.random() * 10000);
      setReRender(random);
    }
  };

  const handleRemove = async (id) => {
    console.log(id);
    let res = await axios({
      method: "DELETE",
      url: `http://localhost:8085/api/v1/brand/delete/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res && res.data && res.data.status === 200) {
      toast.success("Delete brand success");
      const random = Math.floor(Math.random() * 10000);
      setReRender(random);
    }
  };

  const handleUpdateState = async (item) => {
    const { brandName, urlLogo, id } = item;
    setName(brandName);
    setLink(urlLogo);
    setId(id);
    setBlockAdd(true);
    setBlockUpdate(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleUpdateBrand = async () => {
    let data = {
      brandName: name,
      urlLogo: link,
    };
    let res = await axios({
      method: "PUT",
      url: `http://localhost:8085/api/v1/brand/update/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });

    if (res && res.data && res.data.status === 200) {
      toast.success("Update category success");
      setName("");
      setLink("");
      setBlockAdd(false);
      setBlockUpdate(true);
      const random = Math.floor(Math.random() * 10000);
      setReRender(random);
    }
  };
  return (
    <Helmet title="Thương Hiệu">
      <motion.div
        className="px-10"
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
        animate={{ clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)" }}
        exit={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          transition: { duration: 0.3 },
        }}
      >
        <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
          <div className="w-1/2 text-right text-xl font-semibold text-blue-700 uppercase">
            QUẢN LÍ thương hiệu
          </div>
          <div className="relative w-1/2 flex justify-end">
            <button className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
              <img src="https://genk.mediacdn.vn/2018/11/26/john-cena-fashion-15431990207761255377744.jpg" />
            </button>

            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 hidden">
              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Account
              </a>

              <a
                href="#"
                className="block px-4 py-2 account-link hover:text-white"
              >
                Sign Out
              </a>
            </div>
          </div>
        </header>

        {/* add product */}
        <div className="bg-slate-50 py-10 rounded-lg">
          <h3 className="ml-5 uppercase mb-5 font-medium text-xl">
            Thêm thương hiệu
          </h3>
          <div className="px-10">
            <div className="flex items-center mb-5">
              <input
                className=" block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[760px]"
                placeholder="Fill name category input..."
                type="text"
                name="search"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <h4 className="whitespace-nowrap uppercase ml-5 font-normal">
                tên thương hiệu
              </h4>
            </div>
            <div className="flex items-center mb-5">
              <input
                className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-[760px]"
                placeholder="Fill link image input..."
                type="text"
                name="search"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              <h4 className="whitespace-nowrap uppercase ml-5 font-normal">
                link hình ảnh
              </h4>
            </div>
            <div className="flex">
              <button
                className={`flex items-center mt-5 text-white bg-[#1435c3] px-5 py-2 rounded-md  transition-all mr-5 ${
                  blockAdd
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-slate-300 hover:text-[#1435c3]"
                }`}
                disabled={blockAdd ? true : false}
                onClick={handleAddBrand}
              >
                <AiFillFolderAdd size={"30px"} />
                <div className="ml-2">Thêm</div>
              </button>
              <button
                className={`flex items-center mt-5 text-white bg-[#1435c3] px-5 py-2 rounded-md  transition-all ${
                  blockUpdate
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-slate-300 hover:text-[#1435c3]"
                }`}
                onClick={handleUpdateBrand}
                disabled={blockUpdate ? true : false}
              >
                <MdSystemUpdateAlt size={"30px"} />
                <div className="ml-2">Cập nhật</div>
              </button>
            </div>
          </div>
        </div>
        {/* add product */}
        {/* table product */}
        <div className="my-10 bg-slate-50 rounded-md py-5">
          <p className="text-xl pb-3 flex items-center uppercase font-medium ">
            <i className="fas fa-list mr-3"></i> Danh Sách thương hiệu
          </p>
          <div>
            <table>
              <thead className="bg-gray-800 text-white ">
                <tr>
                  <th className="w-[30%] text-left py-3 px-4 uppercase font-semibold text-sm text-center ">
                    stt
                  </th>
                  <th className="w-[30%] text-left py-3 px-4 uppercase font-semibold text-sm text-center">
                    tên
                  </th>
                  <th className="w-[30%] text-left py-3 px-4 uppercase font-semibold text-sm text-center">
                    logo
                  </th>

                  <th className="w-[5%] text-left py-3 px-4 uppercase font-semibold text-sm text-center"></th>
                  <th className="w-[5%] text-left py-3 px-4 uppercase font-semibold text-sm text-center"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {listBrand &&
                  listBrand.length > 0 &&
                  listBrand.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="w-[30%] text-left py-3 px-4 text-center">
                          {item.id}
                        </td>
                        <td className="w-[30%] text-left py-3 px-4 text-center">
                          {item.brandName}
                        </td>

                        <td className="w-[30%]  py-3 px-4 text-center">
                          <img
                            src={item.urlLogo}
                            className="w-[50px] h-[50px] object-contain  mx-auto"
                          />
                        </td>

                        <td className="w-[5%] text-left py-3 px-4 text-center">
                          <MdDeleteForever
                            size="25px"
                            className="cursor-pointer"
                            onClick={() => handleRemove(item.id)}
                          />
                        </td>
                        <td className="w-[5%] text-left py-3 px-4 text-center">
                          <MdOutlineUpdate
                            size="25px"
                            className="cursor-pointer"
                            onClick={() => handleUpdateState(item)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* table product */}
      </motion.div>
    </Helmet>
  );
};

export default Brand;
