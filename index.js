const cherio = require("cheerio");
const {
  validateSololearnId,
  randomUserAgent,
  makeRequest,
  validateRoute,
} = require("./helperFunctions");

async function basicUserInfo(sololearn_id) {
  let basicinfo, requestUrl;
  requestUrl = "https://www.sololearn.com/Profile/" + sololearn_id;

  if (validateSololearnId(sololearn_id)) {
    throw new Error("invalid sololearn id");
  }
  let requestOptions = {
    follow: 0,
    headers: {
      "User-Agent": randomUserAgent(),
    },
  };

  const { res, err } = await makeRequest(requestUrl, requestOptions);
  if (!err && res.ok) {
    let body = await res.text();

    const $ = cherio.load(body);

    const user_name = $(".name").text().trim();
    const user_level = parseInt(
      $(".detail div").first().text().replace(/\n/g, "").slice(5)
    );
    const user_total_xp = parseInt(
      $(".detail div").last().text().trim().slice(0, -3)
    );
    const user_profile_pic_url =
      "https://api.sololearn.com/Uploads/Avatars/" + sololearn_id + ".jpg";

    basicinfo = {
      User_Name: user_name,
      User_Current_Level: user_level,
      User_Total_Xp: user_total_xp,
      User_Profile_Pic_Url: user_profile_pic_url,
    };

    return basicinfo;
  } else if (err) {
    throw new Error("Invalid Sololearn Id Provided");
  }
  throw new Error("Got Invalid Responce");
}

async function getUserBadges(sololearn_id) {
  let userBadges = [];
  let requestUrl = "https://www.sololearn.com/Profile/" + sololearn_id;

  if (validateSololearnId(sololearn_id)) {
    throw new Error("invalid sololearn id");
  }

  let requestOptions = {
    follow: 0,
    headers: {
      "User-Agent": randomUserAgent(),
    },
  };

  const { res, err } = await makeRequest(requestUrl, requestOptions);
  if (!err && res.ok) {
    let body = await res.text();

    const $ = cherio.load(body);

    $(".userAchievements")
      .find(".achievement")
      .each((index, achive) => {
        if ($(achive).hasClass("disabled")) return;

        const badge_text = $(achive).attr("title");
        return userBadges.push(badge_text);
      });

    return userBadges;
  } else if (err) {
    throw new Error("Invalid Sololearn Id Provided");
  }
  throw new Error("Got Invalid Responce");
}

async function getUserCompletedCourses(sololearn_id) {
  let courses = [];
  let requestUrl = "https://www.sololearn.com/Profile/" + sololearn_id;

  if (validateSololearnId(sololearn_id)) {
    throw new Error("invalid sololearn id");
  }

  let requestOptions = {
    follow: 0,
    headers: {
      "User-Agent": randomUserAgent(),
    },
  };

  const { res, err } = await makeRequest(requestUrl, requestOptions);
  if (!err && res.ok) {
    let body = await res.text();

    const $ = cherio.load(body);

    $(".certificate").each((index3, e) => {
      const cert_name = $(e).find(".details").find(".title").text().trim();

      courses.push(cert_name);
    });

    return courses;
  } else if (err) {
    throw new Error("Invalid Sololearn Id Provided");
  }
  throw new Error("Got Invalid Responce");
}

async function getCodeUpvotes(sololearn_id) {
  let codes_upvotes = {};
  let requestUrl = "https://www.sololearn.com/Profile/" + sololearn_id;

  if (validateSololearnId(sololearn_id)) {
    throw new Error("invalid sololearn id");
  }

  let requestOptions = {
    follow: 0,
    headers: {
      "User-Agent": randomUserAgent(),
    },
  };

  const { res, err } = await makeRequest(requestUrl, requestOptions);
  if (!err && res.ok) {
    let body = await res.text();

    const $ = cherio.load(body);

    $(".codeContainer").each((index2, el) => {
      const code_text = $(el).find(".codeDetails a").text();
      const code_link = $(el).find(".codeDetails a").attr("href");
      let code_upvotes = parseInt($(el).find(".positive").html());
      if (Number.isNaN(code_upvotes)) {
        code_upvotes = 0;
      }

      codes_upvotes[code_text] = code_upvotes;
    });

    return codes_upvotes;
  } else if (err) {
    throw new Error("Invalid Sololearn Id Provided");
  }
  throw new Error("Got Invalid Responce");
}

async function getAllCodesLinks(sololearn_id) {
  let codes_links = {};
  let requestUrl = "https://www.sololearn.com/Profile/" + sololearn_id;

  if (validateSololearnId(sololearn_id)) {
    throw new Error("invalid sololearn id");
  }

  let requestOptions = {
    follow: 0,
    headers: {
      "User-Agent": randomUserAgent(),
    },
  };

  const { res, err } = await makeRequest(requestUrl, requestOptions);
  if (!err && res.ok) {
    let body = await res.text();

    const $ = cherio.load(body);

    $(".codeContainer").each((index2, el) => {
      const code_text = $(el).find(".codeDetails a").text();
      const code_link = $(el).find(".codeDetails a").attr("href");

      return (codes_links[code_text] = code_link);
    });

    return codes_links;
  } else if (err) {
    throw new Error("Invalid Sololearn Id Provided");
  }
  throw new Error("Got Invalid Responce");
}

async function getAllCoursesXp(sololearn_id) {
  let courses_xp = {};
  let requestUrl = "https://www.sololearn.com/Profile/" + sololearn_id;

  if (validateSololearnId(sololearn_id)) {
    throw new Error("invalid sololearn id");
  }

  let requestOptions = {
    follow: 0,
    headers: {
      "User-Agent": randomUserAgent(),
    },
  };

  const { res, err } = await makeRequest(requestUrl, requestOptions);
  if (!err && res.ok) {
    let body = await res.text();

    const $ = cherio.load(body);

    $(".courseWrapper").each((index, ele) => {
      const cource_name = $(ele).find("a").attr("title");
      const cource_xp = parseInt($(ele).find(".courseXp").text().slice(0, -3));

      courses_xp[cource_name] = cource_xp;
    });

    return courses_xp;
  } else if (err) {
    throw new Error("Invalid Sololearn Id Provided");
  }
  throw new Error("Got Invalid Responce");
}

async function plagroundCodes(section, language) {
  if (validateRoute(section, language)) {
    throw new Error("Invalid Arguments");
  }

  let requestOptions = {
    follow: 0,
    headers: {
      "User-Agent": randomUserAgent(),
    },
  };
  if(language=='all')language=''
  let reqUrl = `https://www.sololearn.com/Codes?ordering=${section}&language=${language}&page=1`;
  const { res, err } = await makeRequest(reqUrl, requestOptions);

  if (res.ok && !err) {
    let body = await res.text();
    const $ = cherio.load(body);
    let all_codes = [];

    $("#publicCodes")
      .find(".codeContainer")
      .each((i, code) => {
        let base_link = "https://www.sololearn.com";
        let code_name = $(code).find(".codeDetails").find(".codeName a").text();
        let code_link = $(code)
          .find(".codeDetails")
          .find(".codeName a")
          .attr("href");
        let code_lang = $(code).find(".iconContainer a").text();
        let code_upvotes = $(code)
          .find(".codeDetails")
          .find(".detailsWrapper .actions .vote p")
          .text()
          .slice(1);
        let code_published_date = $(code)
          .find(".codeDetails")
          .find(".detailsWrapper .authorDetails .texts .codeDate")
          .text();
        let author_name = $(code)
          .find(".codeDetails")
          .find(".detailsWrapper .authorDetails .texts a")
          .text();
        let author_profile = $(code)
          .find(".codeDetails")
          .find(".detailsWrapper .authorDetails .texts a")
          .attr("href");

        return all_codes.push({
          Code_By: author_name,
          Author_Profile: base_link + author_profile,
          Code_Langauge: code_lang,
          Code_Title: code_name,
          Code_Link: code_link,
          Code_Upvotes: code_upvotes,
          Publish_Date: code_published_date,
        });
      });

    return all_codes;
  } else if (err) {
    throw new Error("Invalid Sololearn Id Provided");
  }
  throw new Error("Got Invalid Responce");
}

exports.basicInfo = basicUserInfo;
exports.userBadges = getUserBadges;
exports.userCompletedCourses = getUserCompletedCourses;
exports.codeUpvotes = getCodeUpvotes;
exports.allCodesLinks = getAllCodesLinks;
exports.allCoursesXp = getAllCoursesXp;
exports.plagroundCodes = plagroundCodes;
