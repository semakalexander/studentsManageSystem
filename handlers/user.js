var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schemas.User;
var Mailer = require('../helpers/mailer');
var mailer = new Mailer();

var Module = function (models) {
    var userModel = models.get('user', userSchema);


    this.getAllUsers = function (req, res, next) {
        userModel.find({}, function (err, users) {
            if (err) {
                return next(err);
            }

            res.status(200).send(users);
        });
        // var session = req.session;
        // var groupId;
        // userModel.findOne({_id: session.userId}, function (err, user) {
        //     if (err) {
        //         return next(err);
        //     }
        //     groupId = user.group;
        // });
        // userModel.find({group: groupId}, function (err, users) {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.status(200).send(users);
        //
        // });
    };

    this.getUsersByCourse = function (req, res, next) {
        var course = req.body.course;
        userModel.find({course: course}, function (err, users) {
            if (err) {
                return next(err);
            }
            res.status(200).send(users);
        })
    };
    this.getMarks = function (req, res, next) {
        var session = req.session;
        userModel.findOne({_id: session.userId}, function (err, user) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user.marks);
        });
    };


    this.createUser = function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var firstName = body.firstName;
        var lastName = body.lastName;


        var shaSum = crypto.createHash('sha256');
        var err;

        if (!email.length || !password.length || !firstName.length || !lastName.length) {
            err = new Error('Empty email or password or name');
            err.status = 400;
            return next(err);
        }
        shaSum.update(password);
        body.password = shaSum.digest('hex');
        body.role = body.role || 'student';
        var user = new userModel(body);


        // var fNames = ['Andriy', 'Stanislav', 'Lyudmila', 'Vasil', 'Lera', 'Marian', 'Andrey', 'Vasya', 'Olya', 'Vasya', 'Yanuska', 'Nazar', 'Sasha', 'Ivan', 'Sergiy', 'Anastasiya', 'Ruslan', 'Yana', 'Yura', 'Vladislav', 'Vasya', 'Sintiya', 'Tanya', 'Lesya', 'Vasya', 'Tanka', 'Mikhaylo', 'Volodya', 'Yuliya', 'Kate', 'Eunuch', 'Misha', 'Vanya', 'Oksana', 'Ksyukha', 'Petro', 'Andriy', 'Hari', 'Andpiana', 'Vasily', 'Roman', 'Alexandra', 'Yury', 'Misha', 'Angelina', 'Alexander', 'Sanya', 'Alexandra', 'Vasyutka', 'Nadiya', 'Renata', 'Erik', 'Roma', 'Viktoriya', 'Sasha', 'Artur', 'Alina', 'Lyubchik', 'Mark', 'Anna', 'Diana', 'Olexandra', 'Tolya', 'Natalka', 'Rostik', 'Inna', 'Amr', 'Lenuta', 'Andriy', 'Vika', 'Slavik', 'Diana', 'Dima', 'Dima', 'Anechka', 'Dima', 'Yura', 'Dina', 'Vladislav', 'Misha', 'Nika', 'Natalya', 'Nika', 'Lesya', 'Viktoriya', 'Sasha', 'Ivan', 'Anyutka', 'Mikhaylo', 'Ksyusha', 'Vasya', 'Angelinka', 'Lilya', 'Roxolana', 'Olexandra', 'Olexandr', 'Natasha', 'Elka', 'Andriy', 'Sasha', 'Katerina', 'Marina', 'Stas', "Mar'yana", 'Sasha', 'Ksyusha', 'Givi', 'Stepan', 'Nazar', 'Yanosh', 'Ira', 'Viktoriya', 'Vasya', 'Oleg', 'Irka', 'Lilya', 'Diana', 'Anna', 'Alina', 'Taras', 'Diana', 'Yanka', 'Viktoriya', 'Kristina', 'Shon', 'Olga', 'Ira', 'Andriy', 'Yuriy', 'Natasha', 'Oleg', 'Veronika', 'Vasya', 'Svitlana', 'Sergey', 'Maxim', 'Yura', 'Anastasia', 'Vanya', 'Misha', 'Viktoriya', 'Bogdana', 'Dead'];
        // var lNames = ['Sosna', 'Grebenets', 'Michak', 'Ryabets', 'Varodi', 'Logoyda', 'Shap', 'Schadey', 'Dzyaruk', 'Kalabishka', 'Mastyak', 'Maleev', 'Tkachuk', 'Maletich', 'Mishanich', 'Olexin', 'Pazukhanich', 'Gulyanich', 'Golomb', 'Gorbunov', 'Onisko', 'Royak', 'Kut', 'Brich', 'Merenich', 'Vasilinets', 'Brich', 'Reparyuk', 'Bernada', 'Katrin', 'Provocateur', 'Totar', 'Zatvarsky', 'Mulesa', 'Shokina', 'Sidoran', 'Fedorishko', 'Krisshnan', 'Moysh', 'Stark', 'Sichkar', 'Konevich', 'Kifor', 'Gerzhik', 'Glyudzik', 'Avdeev', 'Tovt', 'Solovey', 'Manivchuk', 'Bayeva', 'Palinchak', 'Zovdun', 'Blanar', 'Lopatyuk', 'Barnich', 'Ivancho', 'Shandra', 'Babidorich', 'Yatskanich', 'Malesh', 'Danko', 'Bodnar', 'Bily', 'Ignatishin', 'Dovganich', 'Kozich', 'Maher', 'Pop', 'Golyana', 'Rosokha', 'Dzhugan', 'Ertel', 'Duda', 'Zubanych', 'Savlyak', 'Sukhetsky', 'Krikunenko', 'Yakubich', 'Lakatosh', 'Nikirka', 'Zaytseva', 'Blikharska', 'Kokotkina', 'Rarich', 'Feyesh', 'Vinchester', 'Glinka', 'Yevchinets', 'Tudovshi', 'Boris', 'Bushtin', 'Gubinets', 'Vasilechko', 'Shimkus', 'Dalekorey', 'Porokhnyuk', 'Rusnak', 'Gartman', 'Zalisky', 'Rusin', 'Kmit', 'Savchinets', 'Pavlyuk', 'Nebelo', 'Dzekunov', 'Keming', 'Modebadze', 'Yablonsky', 'Pilipiv', 'Chukhran', 'Polonchak', 'Mironova', 'Vareschuk', 'Gudzinsky', 'Lakatosh', 'Sobran', 'Pishta', 'Sinkulich', 'Golovchuk', 'Gudak', 'Shtefko', 'Burin', 'Vashkeba', 'Manzich', 'Kish', 'Bendas', 'Panchenko', 'Doru', 'Pankulich', 'Zhulinskaya', 'Tibor', 'Kobal', 'Eyber', 'Toder', 'Shkurin', 'Minaylenko', 'Veselovsky', 'Streltsova', 'Osiysky', 'Bizilya', 'Khoma', 'Scherban', 'Memory'];
        // var emails = ['andrij_sosna', 'destroyyourbrain', 'mila_m_o_o', 'ryabets96', 'lera_varodi', 'marian_logoyda', 'shapxxx', 'shadej', 'olyadzyaruk', 'w_a_s_k_a', 'jano4ka89', 'nazar.malyeyev', 'super_simpson', 'navi_rap', 'y_m_f_c', 'nastya_01_08_96', 'vk.compooot', 'yonchik12', 'xaxashutkin', 'mr_been_one', 'vasya_onysko', 'cynthia_royak', 'daarwolokaaldovah', 'l.brich', 'zemnu', 'tn_vslnts', 'michael_volt', 'reparyuk_vova97', 'yb_97', 'katrin15022', 'eunuchprovocateur', 'm.totar', 'vanyaboss777', 'sh_oksanka', 'ksu.shok', 'hind_d', 'andrew_doping', 'harikrissh', 'andrianamoish', 'djstarkdj', 'sichkarphoto', 'euphoriammm', 'kifor_yura', 'misha.gerzhik', 'anhelinahlyudzyk', 'alex__avdeev', 's.tovt', 'olosolos', 'vasyutka_manivchuk', 'nadja696', 'renatapalinchak', 'erik_zovdun', 'blanar81', 'kykysja8', 'sashabarni', 'djrikko', 'al.shandra', 'babidoritsh22', 'm_yatskanych', 'anichka96', '4c8bc9d2', 'orbit_24', 'sunreich', 'noti_69', 'rostislaw23', 'inna_valentunivna', 'amrmaher', 'lenuta_inike', 'andriyua7', 'vikarosokha', 'special_one9', 'dianaertel', 'd.duda97', 'zubik95', 'anechka.savlyak', '1blackwhite1', 'sijjjey', 'dinka_yakubych', 'vip_lakatosh', 'mishanukirka', 'antimadridissstka', 'b.nata', 'kissy_may', 'obogdan1996', 'viviahaha', 'crazy.badboy', 'vania_gl', 'aks.cheshire_cat', 'esh_kechan', 'ksyusha_borys', 'krutoy_chel1998', 'angelinka3103', 'lilia2406', 'roxy_buhai', 's_dalekorey', 'sasha_porokhnyuk', 'natasha_natasha0', 'elka_hartman', 'zaliskii_andriy', 'ruszin', 'katherina_kmit', 'maryna_savchynets', 'pavliuk95', 'n.manichka', 'sdzekunov', 'ksyushakeming', 'thaiboxing_modebadze', 'yablonsky95', 'mc_sinet', 'janicsuhran', 'ikondrashkova', 'wwvvwwvvwwvvww', 'webwell', 'gudoleh', 'iryna.lakatosh', 'lilianka_sobran', 'diankapishta', 'asinkulich', 'alinkaaaaaaaa99', 'tarashudak', 'shtefko98', 'yanka10020', 'v.washkeba19', 'kristina_manzich', 'shon_kish', 'olga_bendas', 'funny27', 'andriy_doru', 'yurkapankulych', 'like__freedom', 'tww1nky', 'veronika.kobal', 'ejber', 'yuzo_svitlana', 'chudastikk', 'maxim.minaylenko', 'vyura96', 'horoshaya16', 'io777777777', 'mishanbka14', 'viktoria_khoma', 'bohdana_malunovska', 'lesynchik94'];
        //
        // for (var i = 0; i < fNames.length; i++) {
        //     var ufName = fNames[i];
        //     var ulName = lNames[i];
        //     var uemail = emails[i] + '@mail.ua';
        //     var upassword = 'password' + i;
        //
        //     shaSum = crypto.createHash('sha256');
        //     shaSum.update(upassword);
        //     upassword = shaSum.digest('hex');
        //     var ulogin = ufName + ulName;
        //     var ucourse = Math.ceil(Math.random() * 6);
        //     var uage = ucourse + 17;
        //
        //     var u = new userModel({
        //         email: uemail,
        //         password: upassword,
        //         firstName: ufName,
        //         lastName: ulName,
        //         login: ulogin,
        //         course: ucourse,
        //         age: uage
        //     });
        //
        //     u.save(function (err) {
        //             if (err) {
        //                 console.log(err);
        //                 return next(err);
        //             }
        //             console.log(u);
        //         }
        //     );
        // }


        user.save(function (err) {
            if (err) {
                return next(err);
            }
            res.status(200).send(user);
        });
    };

    this.editUserById = function (req, res, next) {
        var id = req.params.id;
        var body = req.body;
        userModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, user) {
            if (err) {
                return next(err);
            }

            res.status(200).send(user);
        });
    };

    this.deleteUserById = function (req, res, next) {
        userModel.remove({_id: req.params.id}).exec(
            function (err, resp) {
                if (err) {
                    next(err);
                }

                res.status(200).send(resp);
            }
        )
    };

};
module.exports = Module;
