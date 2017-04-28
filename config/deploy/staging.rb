# server-based syntax
# ======================
# Defines a single server with a list of roles and multiple properties.
# You can define all roles on a single server, or split them:

# server 'example.com', user: 'deploy', roles: %w{app db web}, my_property: :my_value
# server 'example.com', user: 'deploy', roles: %w{app web}, other_property: :other_value
# server 'db.example.com', user: 'deploy', roles: %w{db}



# role-based syntax
# ==================

# Defines a role with one or multiple servers. The primary server in each
# group is considered to be the first unless any  hosts have the primary
# property set. Specify the username and a domain or IP for the server.
# Don't use `:all`, it's a meta role.

# role :app, %w{deploy@example.com}, my_property: :my_value
# role :web, %w{user1@primary.com user2@additional.com}, other_property: :other_value
# role :db,  %w{deploy@example.com}



# Configuration
# =============
# You can set any configuration variable like in config/deploy.rb
# These variables are then only loaded and set in this stage.
# For available Capistrano configuration variables see the documentation page.
# http://capistranorb.com/documentation/getting-started/configuration/
# Feel free to add new variables to customise your setup.



# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult the Net::SSH documentation.
# http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# The server-based syntax can be used to override options:
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }


set :deploy_to, '/var/www/houtai_front_stage/deploy'

components_dir = '/var/www/houtai_front_stage/components'
set :components_dir, components_dir

#role :app, %w{staging.chupinxiu.com chupinxiu.com}
role :app, %w{101.200.220.194 123.56.143.171}

#require custom config
require './config/myconfig.rb'

ENV['TZ'] = 'UTC-8'

namespace :deploy do

  desc 'Get stuff ready prior to symlinking'
  task :compile_assets do
    on roles(:app), in: :sequence, wait: 1 do
      execute "sudo chown www-data -R #{deploy_to}"
      execute "sudo chgrp deploy -R #{deploy_to}"
      execute "sudo chmod 775 -R #{deploy_to}/../"
    end
  end

  task :push do
    on roles(:app), in: :sequence, wait: 1 do
        unless system("git pull")
            abort('拉取失败')
        end
        unless system("git push")
            abort('推送失败')
        end
    end
  end

  task :restartqueue do
    on roles(:app), in: :sequence, wait: 1 do
      execute "sudo chown www-data -R #{deploy_to}"
      execute "sudo chgrp deploy -R #{deploy_to}"
      execute "sudo chmod 775 -R #{deploy_to}/../"
    end
  end

  task :chmod do
    on roles(:app), in: :sequence, wait: 1 do
      execute "sudo chown www-data -R #{deploy_to}"
      execute "sudo chgrp deploy -R #{deploy_to}"
      execute "sudo chmod 775 -R #{deploy_to}/../"
    end
  end




  task :release do
    on roles(:app), in: :sequence, wait: 1 do
        unless system("git pull")
            abort('拉取失败')
        end
        system("cd public/blade/origin/;fis3 release prod")
        system("git status")
        system("git add .")
        system("git commit -am buildfis")
        unless system("git push")
            abort('推送失败')
        end
    end
  end

  before :starting, :push
  after :updated, :compile_assets
  after :log_revision, :restartqueue
  before :cleanup_rollback, :chmod

end


# Devops commands
namespace :ops do

  desc 'Copy non-git ENV specific files to servers.'
  task :put_env_components do
    on roles(:app), in: :sequence, wait: 1 do
      execute "mkdir -p #{deploy_to}/../components/"
      upload! './.env.staging', "#{deploy_to}/../components/.env.production"
    end
  end

end
